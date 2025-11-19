import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { User } from 'src/controllers/auth/entities/user.entity';
import { codeErrors } from 'src/params';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { TypeDocuments } from '../type-documents/entities/documents.entity';
import { Country } from './entities/countries.entity';
import { State } from './entities/states.entity';
import { City } from './entities/cities.entity';
import { GeneralStatus } from 'src/common/helpers/enums/general-status.enum';
import { TypeProgram } from './entities/type-programs.entity';
import { CreateTypeProgramDto } from './dto/create-type-program.dto';
import { CreateTypeModalityDto } from './dto/create-type-modality.dto';
import { TypeModality } from './entities/type-modalities.entity';
import { UpdateProgramTypeDto } from './dto/update-program-type.dto';
import { UpdateModalityTypeDto } from './dto/update-modality-type.dto';
import { Cycle } from './entities/cycles.entity';
import { Content } from './entities/contents.entity';

@Injectable()
export class AdminService {
  public codeErrors = codeErrors;
  public generalStatus = GeneralStatus;
  
  constructor(
    @InjectRepository(TypeDocuments)
    private documentModel: Repository<TypeDocuments>,

    @InjectRepository(Role)
    private roleModel: Repository<Role>,

    @InjectRepository(Country)
    private countryModel: Repository<Country>,

    @InjectRepository(State)
    private stateModel: Repository<State>,

    @InjectRepository(City)
    private cityModel: Repository<City>,

    @InjectRepository(TypeProgram)
    private typeProgramModel: Repository<TypeProgram>,

    @InjectRepository(TypeModality)
    private typeModalityModel: Repository<TypeModality>,

    @InjectRepository(Cycle)
    private cycleModel: Repository<Cycle>,

    @InjectRepository(Content)
    private contentModel: Repository<Content>,
  ) {}

  // ********** Metodos Documentos **********
  public async createDocument(createDocumentDto: CreateDocumentDto, user: User): Promise<TypeDocuments> {
    try {
      const newDocument = this.documentModel.create({...createDocumentDto})
      
      const newDocumentSaved = await this.documentModel.save(newDocument);
      
      return newDocumentSaved;
    } catch (err) {  
      if(err.errno === this.codeErrors.duplicatedKey){
        throw new BadRequestException(`Tipo documento ${createDocumentDto.documentName} ya se encuentra registrado en el sistema`);
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err.message}`);
    }
  } 

  public async getDocument(id: number): Promise<TypeDocuments> {
    try {
      const document = await this.documentModel.findOne({
        where: {id: id}
      }); 

      if (!document){
        throw new NotFoundException('¡No se encontró coordinación registrada en el sistema!');
      }

      return document
  
    } catch (err) {  
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor!, ${err.message}`);
    }
  }


  // ********** Metodos Roles **********
  public async getRolById(id: number): Promise<Role>{
    try {
      const role = await this.roleModel.findOne({
        where: { id: id },
      });

      if (!role){
        throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
      }
      return role;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }

  // ********** Metodos Paises **********
  public async getAllCountries(user: User): Promise<Country[]>{
    try {
      const roles = await this.countryModel.find();

      if (!roles){
        throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
      }
      return roles;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }

  // ********** Metodos Departamentos **********
  public async getAllStates(user: User): Promise<State[]>{
    try {
      const states = await this.stateModel.find();

      if (!states){
        throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
      }
      return states;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }

  // ********** Metodos Ciudades **********
  public async getAllCities(user: User): Promise<City[]>{
    try {
      const cities = await this.cityModel.find();

      if (!cities){
        throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
      }
      return cities;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }

  // ********** Metodos Roles **********
  public async getAllRoles(): Promise<any> {

    const displayedColumns: string[] = [ 
      '#',  
      'Nombre del Rol',
      'Estado', 
      'Fecha creación'
    ]; 
  
    const columnMappings: { [key: string]: string } = {
      '#':                   'index',
      'Nombre del Rol':      'roleName',
      'Estado':              'status',
      'Fecha creación':      'createAt'
    };

    const values = await this.roleModel.find();  

    const processedValues = values.map((role, index) => {
      // User detail
      return {
        index: index + 1,
        id: role.id,
        roleName: role.roleName,
        isActive: role.isActive,
        createAt: role.createAt,
        createTime: role.createTime,
        updateAt: role.updateAt,
        updateTime: role.updateTime,
        status: role.isActive ? this.generalStatus.Active : this.generalStatus.Inactive,
        selectedRow: false,
      };
    });
     
    return { 
      displayedColumns, 
      columnMappings, 
      values: processedValues 
    };
  }


  // ********** Metodos Tipos de Programa **********
  public async createTypeProgram(createTypeProgramDto: CreateTypeProgramDto, user: User): Promise<TypeProgram> {
    try {
      const newTypeProgram = this.typeProgramModel.create({
        ...createTypeProgramDto
      })
      
      const savedTypeProgram = await this.typeProgramModel.save(newTypeProgram);
      
      return savedTypeProgram;
    } catch (err) {  
      if(err.errno === this.codeErrors.duplicatedKey){
        throw new BadRequestException(`Tipo de programa ${createTypeProgramDto.type} ya se encuentra registrado en el sistema`);
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err.message}`);
    }
  }

  public async getAllTypePrograms(user: User): Promise<TypeProgram[]> {
    const typePrograms = await this.typeProgramModel.find({
      where: { 
        isActive: true,
      },
    }); 

    if (!typePrograms){
      throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
    }

    return typePrograms
  }

  public async getAllTypeProgramsList(user: User): Promise<any> {
    const displayedColumns: string[] = [ 
      '#',  
      'Coordinación',
      'Tipo de Programa',
      'Estado', 
      'Fecha creación'
    ]; 
  
    const columnMappings: { [key: string]: string } = {
      '#':                'index',
      'Coordinación':     'cordinationName',
      'Tipo de Programa': 'type',
      'Estado':           'status',
      'Fecha creación':   'createAt'
    };

    const typePrograms = await this.typeProgramModel.find({
      where: { 
        isActive: true,
      },
      relations: ['cordination']
    }); 

    if (!typePrograms){
      throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
    }
    
    const listValues = typePrograms.map((programType, index) => {   

      return {
        index: index + 1,
        id: programType.id,
        type: programType.type,
        isActive: programType.isActive,
        createAt: programType.createAt,
        createTime: programType.createTime,
        updateAt: programType.updateAt,
        updateTime: programType.updateTime,
        status: programType.isActive ? this.generalStatus.Active : this.generalStatus.Inactive,

      };
    });
      
    return { 
      displayedColumns, 
      columnMappings, 
      values: listValues 
    };

    return typePrograms
  }

  public async UpdateProgramType(id: number, updateProgramTypeDto: UpdateProgramTypeDto): Promise<any> {
    try {
      const programType = await this.typeProgramModel.findOne({ 
        where: { id: id },
        relations: ['cordination']
      });
  
      if (!programType) {
        throw new InternalServerErrorException('¡No se encontró tipo de programa registrado en el sistema!');
      }

      programType.type = updateProgramTypeDto.type;

      const programTypeUpdated = await this.typeProgramModel.update(id, {
        ...programType
      }); 

      if (programTypeUpdated.affected === 0) {
        throw new InternalServerErrorException('¡No se logro actualizar el registro!');
      }

      const programTypeModel = await this.typeProgramModel.findOne({ 
        where: { id: id },
        relations: ['cordination']
      });

      return programTypeModel;
   
    } catch (err) {
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err.message || err}`);
    }
  }


  // ********** Metodos Tipos de Modalidad **********
  public async createTypeModality(createTypeModalityDto: CreateTypeModalityDto, user: User): Promise<TypeModality> {
    try {
      const newTypeModality = this.typeModalityModel.create({
        ...createTypeModalityDto
      })
      
      const savedTypeModality = await this.typeModalityModel.save(newTypeModality);
      
      return savedTypeModality;
    } catch (err) {  
      if(err.errno === this.codeErrors.duplicatedKey){
        throw new BadRequestException(`Tipo de programa ${createTypeModalityDto.modalityName} ya se encuentra registrado en el sistema`);
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err.message}`);
    }
  }

  public async getAllTypeModalities(user: User): Promise<any> {
    const typeModalities = await this.typeModalityModel.find({
      where: { 
        isActive: true,
      },
    });  

    if (!typeModalities){
      throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
    }
      
    return typeModalities;
  }

  public async getAllTypeModalitiesList(user: User): Promise<any> {
    const displayedColumns: string[] = [ 
      '#',  
      'Coordinación',
      'Tipo de Modalidad',
      'Estado', 
      'Fecha creación'
    ]; 
  
    const columnMappings: { [key: string]: string } = {
      '#':                'index',
      'Coordinación':     'cordinationName',
      'Tipo de Modalidad': 'modalityName',
      'Estado':           'status',
      'Fecha creación':   'createAt'
    };

    const typeModalities = await this.typeModalityModel.find({
      where: { 
        isActive: true,
      },
      relations: ['cordination'],
    });  

    if (!typeModalities){
      throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
    }
    
    const listValues = typeModalities.map((modalityType, index) => {   

      return {
        index: index + 1,
        id: modalityType.id,
        modalityName: modalityType.modalityName,
        isActive: modalityType.isActive,
        createAt: modalityType.createAt,
        createTime: modalityType.createTime,
        updateAt: modalityType.updateAt,
        updateTime: modalityType.updateTime,
        status: modalityType.isActive ? this.generalStatus.Active : this.generalStatus.Inactive,
      };
    });
      
    return { 
      displayedColumns, 
      columnMappings, 
      values: listValues 
    };
  }

  public async UpdateNodalityType(id: number, updateModalityTypeDto: UpdateModalityTypeDto): Promise<any> {
    try {
      const modalityType = await this.typeModalityModel.findOne({ 
        where: { id: id },
        relations: ['cordination']
      });
  
      if (!modalityType) {
        throw new InternalServerErrorException('¡No se encontró tipo de modalidad registrado en el sistema!');
      }

      modalityType.modalityName = updateModalityTypeDto.modalityName;

      const programTypeUpdated = await this.typeModalityModel.update(id, {
        ...modalityType
      }); 

      if (programTypeUpdated.affected === 0) {
        throw new InternalServerErrorException('¡No se logro actualizar el registro!');
      }

      const modalityTypeModel = await this.typeModalityModel.findOne({ 
        where: { id: id },
        relations: ['cordination']
      });
      return modalityTypeModel;
   
    } catch (err) {
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err.message || err}`);
    }
  }
  
  // ********** Metodos Tipos de getAllCycles **********
  public async getAllCycles(user: User): Promise<Cycle[]> {
    const cycles = await this.cycleModel.find({
      where: { 
        isActive: true,
      },
    }); 

    if (!cycles){
      throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
    }

    return cycles
  }


  // ********** Metodos de Contents **********
  public async getAllContents(user: User): Promise<Content[]> {
    const contents = await this.contentModel.find({
      where: { 
        isActive: true,
      },
    }); 

    if (!contents){
      throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
    }

    return contents
  }
}
