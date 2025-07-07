import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginResponse } from './interfaces/login-response';
import { AdminService } from 'src/controllers/admin/admin.service';
import { UserService } from 'src/controllers/user/user.service';
import { UserDetail } from 'src/controllers/user/entities/user-detail.entity';
import { codeErrors } from 'src/params';

@Injectable()
export class AuthService {
  public codeErrors = codeErrors;

  constructor(
    @InjectRepository(User)
    private userModel: Repository<User>,

    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}
  
  public async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      // 1. Encrypt Password
      const { password, ...userData } = createUserDto;

      const passwordEncrypt = bcrypt.hashSync( password, 10 );
      const userName = `${userData.documentNumber}`;

      // 1. Buscar el rol en la base de datos
      const role = await this.adminService.getRolById(createUserDto.rolesId);

      // 2. Validar si el rol existe
      if (!role) {
        throw new Error(`El rol con ID ${createUserDto.rolesId} no existe`);
      }

      const newUser = this.userModel.create({
        password: bcrypt.hashSync( password, 10 ),
        userName: userName,
        role,
        ...userData
      });

      // 2. Save user 
      const newUserSaved = await this.userModel.save(newUser);

      if (!newUserSaved) {
        throw new InternalServerErrorException('¡Ha ocurrido un error en el servidor!');
      }
      
      // 3. Save userDetail
      createUserDto.id = newUserSaved.id;
      const createUserDetails = await this.userService.createUserDetail(createUserDto);
    
      const { password:_, ...rest } = newUserSaved;

      const response = {
        user: rest,
        UserDetail: createUserDetails
      }

      return response;

    }catch (err){
      if(err.errno === codeErrors.duplicatedKey){
        throw new BadRequestException(`El correo ${createUserDto.email} se encuentra registrado en el sistema`);
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
    }
  }
  
  public async signIn(loginDto: LoginDto): Promise<LoginResponse> {
    // 1. Validate user credentials
    // 2. Generate JWT token
    // 3. Return JWT token
    // 4. Consultar información del usuario y retornar al front para guardar en storage


    // Se valida login con email o userName
    const { email, password } = loginDto;

    let user = await this.userModel.findOne({ 
      where:  { 
        email: email,
      },
      relations: ['role', 'userDetail'],
    });
    if (!user){
      user = await this.userModel.findOne({ 
        where:  { 
          userName: email,
        },
        relations: ['role', 'userDetail'],
      });

      if (!user){
        throw new UnauthorizedException('Credenciales invalidas - Usuario no fue encontrado');
      }
    }

    if (!user.isActive){
      throw new UnauthorizedException('Usuario se encuentra inactivo, debe contactar al administrador del sistema');
    }

    if (!bcrypt.compareSync( password, user.password)){
      throw new UnauthorizedException('Credenciales invalidas - No conincide la contraseña');
    }

    const { password:_, ...restDataUser } = user; 

    // Obtener los roles del usuario
    const roles = await this.adminService.getRolById(user.role.id);
    if (!roles) {
      throw new NotFoundException('Rol no encontrado, por favor contactar al administrador del sistema');
    }

    if (!roles.isActive) {
      throw new NotFoundException('Rol se encuentra inactivo, por favor contactar al administrador del sistema');
    }

    const userDetail = await this.userService.getUserDetail(user.id);
    const response = {
      user: restDataUser,
      userDetail: userDetail,
      token: this.getJwtToken({
        id: user.id
      })
    }

    return response
  }

  public getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  public async getUserById(id: number){
    const user = await this.userModel.findOne({
      where: { id: id },
      relations: ['role', 'userDetail']
    });
    const { password, ...rest } = user;
    return rest;
  }
}
