import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { codeErrors } from 'src/params';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetail } from './entities/user-detail.entity';
import { Repository } from 'typeorm';
import { User } from 'src/controllers/auth/entities/user.entity';
import { CreateUserDto } from 'src/controllers/auth/dto/create-user.dto';
import { TypeDocuments } from '../type-documents/entities/documents.entity';
import { GeneralStatus } from 'src/common/helpers/enums/general-status.enum';
import { Role } from '../role/entities/role.entity';
import { Country } from '../admin/entities/countries.entity';
import { State } from '../admin/entities/states.entity';
import { City } from '../admin/entities/cities.entity';

@Injectable()
export class UserService {
  public generalStatus = GeneralStatus;

  constructor(
    @InjectRepository(User)
    private userModel: Repository<User>,

    @InjectRepository(UserDetail)
    private userDetailModel: Repository<UserDetail>,

    @InjectRepository(Role)
    private roleModel: Repository<Role>,

    @InjectRepository(TypeDocuments)
    private documentModel: Repository<TypeDocuments>,

    @InjectRepository(Country)
    private countryModel: Repository<Country>,

    @InjectRepository(State)
    private stateModel: Repository<State>,

    @InjectRepository(City)
    private cityModel: Repository<City>,
  ) {}

  public async createUserDetail(createUserDto: CreateUserDto): Promise<UserDetail> {
    try {
      // 1. Buscar el usuario
      const user = await this.userModel.findOne({
        where: {id: createUserDto.id}
      });

      if (!user) {
        throw new Error(`El usuario con ID ${createUserDto.id} no existe`);
      }

      // 2. Buscar el tipo de documento
      const typeDocuments = await this.documentModel.findOne({
        where: {id: createUserDto.typeDocumentsId}
      });

      if (!typeDocuments) {
        throw new Error(`El usuario con ID ${createUserDto.typeDocumentsId} no existe`);
      }

      // 3. Buscar el pais
      const country = await this.countryModel.findOne({
        where: {id: createUserDto.countriesId}
      });

      if (!country) {
        throw new Error(`El pais con ID ${createUserDto.countriesId} no existe`);
      }

      // 4. Buscar el departamento
      const state = await this.stateModel.findOne({
        where: {id: createUserDto.statesId}
      });

      if (!state) {
        throw new Error(`El departamento con ID ${createUserDto.statesId} no existe`);
      }

      // 5. Buscar la ciudad
      const city = await this.cityModel.findOne({
        where: {id: createUserDto.citiesId}
      });

      if (!city) {
        throw new Error(`La ciudad con ID ${createUserDto.citiesId} no existe`);
      }

      // Almacena detalle del usuario en la base de datos UserDetail
      const newUserDetail =  this.userDetailModel.create({
        typeDocuments,
        user,
        country,
        state,
        city,
        ...createUserDto
      });
      const newUserDetailSaved = await this.userDetailModel.save(newUserDetail);

      if (!newUserDetailSaved) {
        throw new InternalServerErrorException('¡Ha ocurrido un error en el servidor!');
      }
      return newUserDetailSaved;

    }catch (err){
      if(err.errno === codeErrors.duplicatedKey){
        throw new BadRequestException(`${createUserDto} ya existe`);
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
    }
  }

  public async getUserDetail(id: number): Promise<UserDetail> {
    try {
      // Almacena detalle del usuario en la base de datos UserDetail
      const userDetail = this.userDetailModel.findOne({ 
        where: {id: id }
      });

      if (!userDetail) {
        throw new InternalServerErrorException('¡No se encontró usuario registrado en el sistema!');
      }

      return userDetail;

    }catch (err){
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
    }
  }

  public async viewUser(id: number): Promise<any> {
    try {
      // Almacena detalle del usuario en la base de datos UserDetail
      const userModel = this.userModel.findOne({ 
        where: {id: id },
        relations: ['userDetail', 'role', 'cordination', 'userDetail.typeDocuments', 'userDetail.country', 'userDetail.state', 'userDetail.city']
      });

      if (!userModel) {
        throw new InternalServerErrorException('¡No se encontró usuario registrado en el sistema!');
      }

      return userModel;

    }catch (err){
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
    }
  }

  public async getAllUsers(user: User): Promise<any> {

    const displayedColumns: string[] = [ 
      '#',  
      'Nombre',
      'Tipo de Documento',
      'Número de Documento',
      'Rol', 
      'Estado', 
      'Fecha creación'
    ]; 
  
    const columnMappings: { [key: string]: string } = {
      '#':                   'index',
      'Nombre':              'fullName',
      'Tipo de Documento':   'documentName',
      'Número de Documento': 'documentNumber',
      'Rol':                 'roleName',
      'Estado':              'status',
      'Fecha creación':      'createAt'
    };

    const values = await this.userModel.find({
      relations: ['userDetail', 'role', 'userDetail.typeDocuments', 'userDetail.country', 'userDetail.state', 'userDetail.city']
    });  

    const processedValues = values.map((user, index) => {
      // Extraemos las propiedades de userDetail (suponiendo que hay un solo detalle)
      const userDetail = user.userDetail; // Solo tomamos el primer detalle
    
      return {
        // Detalle User
        index: index + 1,
        id: user.id,
        email: user.email,
        userName: user.userName,
        isActive: user.isActive,
        createAt: user.createAt,
        createTime: user.createTime,
        updateAt: user.updateAt,
        updateTime: user.updateTime,
        status: user.isActive ? this.generalStatus.Active : this.generalStatus.Inactive,

        // Detalle UserDetail
        userDetailId: userDetail.id,
        firstName: userDetail.firstName,
        secondName: userDetail.secondName,
        lastName: userDetail.lastName,
        sureName: userDetail.sureName,
        fullName: `${userDetail.firstName} ${userDetail.lastName}`,  
        documentNumber: userDetail.documentNumber,      
        phoneNumber: userDetail.phoneNumber,
        userDetailEmail: userDetail.email,
        closePersonNames: userDetail.closePersonNames,
        closePersonPhone: userDetail.closePersonPhone,

        // Detalle Document
        documentId: userDetail.typeDocuments.id,  
        documentName: userDetail.typeDocuments.documentName,  
 
        // Detalle Rol
        roleId: user.role.id,
        roleName: user.role.roleName,
        selectedRow: false,
      };
    });
     
    return { 
      displayedColumns, 
      columnMappings, 
      values: processedValues 
    };
  }

  public async updateUserDetail(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      // Buscar el usuario en el sistema, incluyendo las relaciones necesarias
      const userModel = await this.userModel.findOne({ 
        where: { id: id },
        relations: ['userDetail', 'role', 'cordination', 'userDetail.typeDocuments', 'userDetail.country', 'userDetail.state', 'userDetail.city']
      });
  
      // Verificar si el usuario existe
      if (!userModel) {
        throw new InternalServerErrorException('¡No se encontró usuario registrado en el sistema!');
      }

      // Obtener el detalle del usuario (userDetail)
      const userDetail = userModel.userDetail;
  
      // Verificar si el detalle del usuario existe
      if (!userDetail) {
        throw new InternalServerErrorException('¡No se encontró detalle del usuario!');
      }

      // Buscar que exista el rol
      const role = await this.roleModel.findOne({ 
        where: { id:  updateUserDto.rolesId},
      });

      // Verificar si el detalle del usuario existe
      if (!role) {
        throw new InternalServerErrorException('¡No se encontró rol!');
      }

      // Buscar que exista el el pais
      const country = await this.countryModel.findOne({ 
        where: { id:  updateUserDto.countriesId},
      });

      // Verificar si el detalle del usuario existe
      if (!country) {
        throw new InternalServerErrorException('¡No se encontró pais!');
      }

      // Buscar que exista el estadp
      const state = await this.stateModel.findOne({ 
        where: { id:  updateUserDto.statesId},
      });

      // Verificar si el detalle del usuario existe
      if (!state) {
        throw new InternalServerErrorException('¡No se encontró departamento!');
      }

      // Buscar que exista la ciuydad
      const city = await this.cityModel.findOne({ 
        where: { id:  updateUserDto.citiesId},
      });

      // Verificar si el detalle del usuario existe
      if (!city) {
        throw new InternalServerErrorException('¡No se encontró departamento!');
      }

      // Buscar que exista el tipo de documento
      const document = await this.documentModel.findOne({ 
        where: { id:  updateUserDto.typeDocumentsId},
      });

      // Verificar si el detalle del usuario existe
      if (!document) {
        throw new InternalServerErrorException('¡No se encontró tipo de documento!');
      }

      // Actualizar las propiedades del usuario
      userModel.role = role;
      userModel.email = updateUserDto.email;

      // Guardar los datos del usuario
      const updatedUser = await this.userModel.save(userModel); 
      
      // Actualizar las propiedades del detalle del usuario
      userDetail.typeDocuments = document;
      userDetail.documentNumber = updateUserDto.documentNumber;
      userDetail.firstName = updateUserDto.firstName;
      userDetail.secondName = updateUserDto.secondName;
      userDetail.lastName = updateUserDto.lastName;
      userDetail.sureName = updateUserDto.sureName;
      userDetail.email = updateUserDto.email;
      userDetail.phoneNumber = updateUserDto.phoneNumber;
      userDetail.country = country;
      userDetail.state = state;
      userDetail.city = city;
      userDetail.closePersonNames = updateUserDto.closePersonNames;
      userDetail.closePersonPhone = updateUserDto.closePersonPhone;
  
      // Guardar el detalle del usuario actualizado
      const updatedUserDetail = await this.userDetailModel.save(userDetail); 
  
      const dataUserUpdated = {
        updatedUser,
        updatedUserDetail,
      }
      // Retornar el detalle del usuario actualizado
      return dataUserUpdated;
  
    } catch (err) {
      // Manejo de errores
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err.message || err}`);
    }
  }

  public async updateUserStatus(id: number, updateStatusDto: any): Promise<any> {
    try {
      // Almacena detalle del usuario en la base de datos UserDetail
      const user = await this.userModel.findOne({
        where: {id: id },
      });
    
      if (!user) {
        throw new InternalServerErrorException('¡No se encontró estudiante registrado en el sistema!');
      }
      
      // Verifica el nuevo estado del usuario
      const newStatus = user.isActive ? false : true;
      
      // Actualiza las propiedades del usuario
      await this.userModel.update(id, {
        ...user,
        isActive: newStatus,
      });
      
      let updatedUser = await this.userModel.findOne({
        where: { id: id },
      });

      // Consulta detalle del usuario en la base de datos UserDetail
      const userDetail = await this.userDetailModel.findOne({
        where: {
          user: {
            id: id
          } 
        },
      });

      let response: any = updatedUser;
      response.fullName = `${userDetail.firstName} ${userDetail.lastName}`;
      
      return response


    }catch (err){
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
    }
  }
  
}
