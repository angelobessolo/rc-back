import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';
import { User } from 'src/controllers/auth/entities/user.entity';
import { codeErrors } from 'src/params';
import { GeneralStatus } from 'src/common/helpers/enums/general-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeProgram } from '../admin/entities/type-programs.entity';
import { TypeModality } from '../admin/entities/type-modalities.entity';

@Injectable()
export class ProgramService {
  public codeErrors = codeErrors;
  public generalStatus = GeneralStatus;
    
  constructor(
    @InjectRepository(TypeProgram)
    private typeProgramModel: Repository<TypeProgram>,
    
    @InjectRepository(TypeModality)
    private typeModalityModel: Repository<TypeModality>,

    @InjectRepository(Program)
    private programModel: Repository<Program>,
  ) {}

  // ********** Metodos Programas **********
  public async createProgram(createProgramDto: CreateProgramDto, user: User): Promise<Program> {
    const { cordinationsId ,typeProgramsId, typeModalitiesId } = createProgramDto;
  
    // Validar que el tipo de programa exista
    const typeProgram = await this.typeProgramModel.findOne({ where: { id: typeProgramsId } });
    if (!typeProgram) {
      throw new BadRequestException('El tipo de programa no existe.');
    }
  
    // Validar que el tipo de modalidad exista
    const typeModality = await this.typeModalityModel.findOne({ where: { id: typeModalitiesId } });
    if (!typeModality) {
      throw new BadRequestException('El tipo de modalidad no existe.');
    }

    createProgramDto.amountSubjects = createProgramDto.amountSubjects ? createProgramDto.amountSubjects : 8;


  
    // Ya puedes crear el programa
    const program = this.programModel.create({
      typeProgram, 
      typeModality,
      ...createProgramDto,
    });
  
    return await this.programModel.save(program);
  }

  public async getAllPrograms(): Promise<Program[]> {

    const programs = await this.programModel.find({
      where: { isActive: true },
      relations: ['typeProgram', 'typeModality'],
    });  

    return programs;
  }

  public async getAllProgramsList(): Promise<any> {

    const displayedColumns: string[] = [ 
      '#',  
      'Coordinación',
      'Tipo Programa',
      'Tipo Modalidad',
      'Nombre del Programa',
      'Estado', 
      'Fecha creación'
    ]; 
  
    const columnMappings: { [key: string]: string } = {
      '#':                   'index',
      'Coordinación':        'cordinationName',
      'Tipo Programa':       'type',
      'Tipo Modalidad':      'modalityName',
      'Nombre del Programa': 'programName',
      'Estado':              'status',
      'Fecha creación':      'createAt'
    };

    const values = await this.programModel.find({
      relations: ['cordination', 'typeProgram', 'typeModality'],
      order: {
        typeProgram: {
          id: 'ASC',
        },
        typeModality: {
          id: 'ASC', 
        }
      },
    });  

    const processedValues = values.map((program, index) => {

      const { typeProgram, typeModality } = program;
     
      return {
        // Detalle User
        index: index + 1,
        id: program.id,
        type: typeProgram.type,
        modalityName: typeModality.modalityName,
        programName: program.programName,
        isActive: program.isActive,
        createAt: program.createAt,
        createTime: program.createTime,
        updateAt: program.updateAt,
        updateTime: program.updateTime,
        status: program.isActive ? this.generalStatus.Active : this.generalStatus.Inactive,
        selectedRow: false,

        typeProgram,
        typeModality

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
