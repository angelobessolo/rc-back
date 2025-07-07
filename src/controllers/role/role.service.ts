import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { AuthService } from 'src/controllers/auth/auth.service';
import { codeErrors } from 'src/params';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/controllers/auth/entities/user.entity';
import { AdminService } from '../admin/admin.service';
import { CreateRoleModuleDto } from './dto/create-role-module.dto';
import { UpdateRoleModuleDto } from './dto/update-role-module.dto';


@Injectable()
export class RoleService {
  public codeErrors = codeErrors;
  constructor(
    @InjectRepository(Role)
    private roleModel: Repository<Role>,

    @Inject(forwardRef(() => AdminService)) private readonly adminService: AdminService, 
  ) {}

  public async create(createRoleDto: CreateRoleDto, user: User): Promise<Role> {
    try {
      const newRole =  this.roleModel.create(createRoleDto);
  
      const roleObject = await this.roleModel.save(newRole);
  
      return roleObject;
  
     } catch (err) {  
      if(err.errno === this.codeErrors.duplicatedKey){
        throw new BadRequestException(`Rol ${createRoleDto.roleName} ya se encuentra registrado en el sistema`);
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err.message}`);
     }
  }

  public async findRoleByName(role: string): Promise<Role>{
    try {
      const roleName = await this.roleModel.createQueryBuilder('role')
        .where('role.roleName LIKE :roleName', { roleName: `%${role}%` })
        .getOne();

      if (!roleName){
        throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
      }
      return roleName;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Si es NotFoundException, vuelve a lanzarla
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }

  public async getRolById(id: number): Promise<Role>{
    try {
      const rol = await this.roleModel.findOne({
        where: {id: id}
      });

      if (!rol){
        throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
      }
      return rol;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Si es NotFoundException, vuelve a lanzarla
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }

  public async getAllRoles(user: User): Promise<Role[]>{
    try {
      const roles = await this.roleModel.find();

      if (!roles){
        throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
      }
      return roles;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Si es NotFoundException, vuelve a lanzarla
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }
}
