import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGruopDto } from './dto/create-group.dto';
import { UpdateGruopDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GeneralStatus } from 'src/common/helpers/enums/general-status.enum';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Program } from '../program/entities/program.entity';
import { codeErrors } from 'src/params';
import { User } from 'src/controllers/auth/entities/user.entity';
import { AddSubjectDto } from './dto/add-subjetc.dto';

@Injectable()
export class GroupService {
  public generalStatus = GeneralStatus;

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,

    @InjectRepository(Group)
    private readonly groupModel: Repository<Group>,

    @InjectRepository(Program)
    private readonly programModel: Repository<Program>,
  ) {}

  // Methods about group
  public async createGroup(createGruopDto: CreateGruopDto): Promise<Group> {
    try {
      const group = await this.groupModel.findOne({
        where: {groupName: createGruopDto.groupName},
        relations: ['program']
      });

      if (group) {
        throw new Error(`El grupo ${createGruopDto.groupName} ya se encuentra registrado en el sistema`);
      }

      const program = await this.programModel.findOne({
        where: {id: createGruopDto.programsId},
        relations: ['cordination', 'studentPrograms', 'typeModality', 'typeProgram']
      });

      if (!program) {
        throw new Error(`El programa con el identificador ${createGruopDto.programsId} no se encuentra registrado en el sistema`);
      }

      const groupModel = this.groupModel.create({
        ...createGruopDto
      });

      const savedGroup = await this.groupModel.save(groupModel);

      if (!savedGroup) {
        throw new InternalServerErrorException('¡Ha ocurrido un error en el servidor al momento de crear grupo!');
      }
      
      return savedGroup;

    }catch (err){
      if(err.errno === codeErrors.duplicatedKey){
        throw new BadRequestException(`${createGruopDto.groupName} se encuentra registrado en el sistema`);
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor al momento de crear grupo! ${err}`);
    }
  }

  public async getAllGroups(): Promise<any> {
    const groups = await this.groupModel.find({
      where: { isActive: true },
    });  

    return groups
  }

  public async getAllGroupsList(): Promise<any> {

    const displayedColumns: string[] = [ 
      '#',  
      'Coordinación',
      'Tipo Programa',
      'Tipo Modalidad',
      'Nombre del Programa',
      'Grupo',
      'Estado', 
      'Fecha creación'
    ]; 
  
    const columnMappings: { [key: string]: string } = {
      '#':                   'index',
      'Coordinación':        'cordinationName',
      'Tipo Programa':       'type',
      'Tipo Modalidad':      'modalityName',
      'Nombre del Programa': 'programName',
      'Grupo':               'groupName',  
      'Estado':              'status',
      'Fecha creación':      'createAt'
    };

    const values = await this.groupModel.find({
      relations: ['program', 'program.cordination', 'program.typeProgram', 'program.typeModality'],
    });  

    const processedValues = values.map((group, index) => {
     
      return {
        // Detalle User
        index: index + 1,
        id: group.id,
        groupName: group.groupName,
        isActive: group.isActive,
        createAt: group.createAt,
        createTime: group.createTime,
        updateAt: group.updateAt,
        updateTime: group.updateTime,
        status: group.isActive ? this.generalStatus.Active : this.generalStatus.Inactive,
        selectedRow: false,
      };
    });

    //Ordena los registros mapeados 
    processedValues.sort((a, b) => a.index - b.index);
     
    return { 
      displayedColumns, 
      columnMappings, 
      values: processedValues 
    };
  }
}
