import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRegisterStudentDto } from './dto/create-register-student.dto';
import { UpdateRegisterStudentDto } from './dto/update-register-student.dto';
import { codeErrors } from 'src/params';
import { GeneralStatus } from 'src/common/helpers/enums/general-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentForms } from './entities/student-forms.entity';
import { Repository } from 'typeorm';
import { TypeDocuments } from 'src/controllers/type-documents/entities/documents.entity';
import { TypeProgram } from 'src/controllers/admin/entities/type-programs.entity';
import { AuthService } from 'src/controllers/auth/auth.service';
import { generateReceive } from 'src/common/helpers/files';
import { Program } from 'src/controllers/program/entities/program.entity';
import { Group } from 'src/controllers/gruop/entities/group.entity';
import { User } from '../auth/entities/user.entity';
import { StudentFormsCycles } from './entities/student-forms-cycle.entity';

@Injectable()
export class RegisterStudentService {
  public codeErrors = codeErrors;
  public generalStatus = GeneralStatus;
      
  constructor(
    @InjectRepository(StudentForms)
    private studentFormsModel: Repository<StudentForms>,

    @InjectRepository(TypeDocuments)
    private typeDocumentModel: Repository<TypeDocuments>,

    @InjectRepository(TypeProgram)
    private typeProgramsModel: Repository<TypeProgram>,

    @InjectRepository(Program)
    private programsModel: Repository<Program>,

    @InjectRepository(Group)
    private groupsModel: Repository<Group>,

    @InjectRepository(StudentFormsCycles)
    private studentFormsCyclesModel: Repository<StudentFormsCycles>,


    private readonly authService: AuthService,
  ){}

  // Metodo que crea registro de inscripción 
  // (createRegisterStudentDto: CreateRegisterStudentDto) => dto que contiene valores a insertar
  async createRegisterStudent(createRegisterStudentDto: CreateRegisterStudentDto): Promise<StudentForms> {
    const { typeDocumentsId, typeProgramsId, programsId, groupsId, cyclesContent } = createRegisterStudentDto;

    // Validar que el tipo de documento de la coordinación exista
    const typeDocuments = await this.typeDocumentModel.findOne({ 
      where: { 
        id: typeDocumentsId 
      } 
    });

    if (!typeDocuments) {
      throw new BadRequestException('El tipo de documento no existe.');
    }

    // Validar que el tipo de documento de la coordinación exista
    const typeProgram = await this.typeProgramsModel.findOne({ 
      where: { 
        id: typeProgramsId 
      } 
    });
  
    if (!typeProgram) {
      throw new BadRequestException('El tipo de programa no existe.');
    }

    // Validar que el tipo de documento de la coordinación exista
    let group;
    if (groupsId){
      group = await this.groupsModel.findOne({ 
        where: { 
          id: groupsId 
        } 
      });
  
      if (!group) {
        throw new BadRequestException('El grupo no existe.');
      }
    }
    

    // Validar que el tipo de documento de la coordinación exista
    const program = await this.programsModel.findOne({ 
      where: { 
        id: programsId 
      } 
    });
  
    if (!typeProgram) {
      throw new BadRequestException('El tipo de programa no existe.');
    }

    // almacena el registro
    const studentForm = this.studentFormsModel.create({
      ...createRegisterStudentDto,
      typeProgram,
      typeDocuments,
      program,
      ...(group && { group })
    });

    const savedStudentForm = await this.studentFormsModel.save(studentForm);

    // 2. Crea los registros en studentFormsCycles si cyclesContent viene en el DTO
    if (cyclesContent && Array.isArray(cyclesContent)) {
      for (const cycle of cyclesContent) {
        await this.studentFormsCyclesModel.save({
          studentForms: savedStudentForm,
          cycles: { id: cycle.cyclesId },
          contents: cycle.contentId ? { id: cycle.contentId } : null,
        });
      }
    }
    return savedStudentForm;
    // return await this.studentFormsModel.save(studentForm);
  }

  // Metodo que genera y retorna PDF de inscripción a programa academico
  // (id: number) =>  id del registro en studentForms a procesar
  async GetRegisterStudentBill(id: number): Promise<any> {

    // Validar que el tipo de documento de la coordinación exista
    const studentForms = await this.studentFormsModel.findOne({ 
      where: { 
        id: id 
      },
      relations: ['typeDocuments', 'program', 'program.typeModality', 'program.typeProgram', 'typeProgram', 'group', 'studentFormsCycles', 'studentFormsCycles.cycles', 'studentFormsCycles.contents']
    });

    if (!studentForms) {
      throw new BadRequestException('El registro academico no se ha encontrado en el sistema.');
    }

    // Se procesa información para generar documento PDF
    const doc = await generateReceive(studentForms);

    const values = { studentForms, doc };
    return values
  }

  async getRegisterStudent(id: number): Promise<any> {

    // Validar que el tipo de documento de la coordinación exista
    const studentForms = await this.studentFormsModel.findOne({ 
      where: { 
        id: id 
      },
      relations: ['typeDocuments', 'program', 'program.typeModality', 'program.typeProgram', 'typeProgram', 'group', 'studentFormsCycles', 'studentFormsCycles.cycles', 'studentFormsCycles.contents']
    });

    if (!studentForms) {
      throw new BadRequestException('El registro academico no se ha encontrado en el sistema.');
    }
    
    return studentForms
  }

  public async updateStudentForms(id: number, updateRegisterStudentDto: UpdateRegisterStudentDto): Promise<any> {
    try {
      const { cyclesContent } = updateRegisterStudentDto;

      // Buscar el usuario en el sistema, incluyendo las relaciones necesarias
      // Validar que el tipo de documento de la coordinación exista
      const studentForms = await this.studentFormsModel.findOne({ 
        where: { 
          id: id 
        },
        relations: ['typeDocuments', 'program', 'program.typeModality', 'program.typeProgram', 'typeProgram', 'group']
      });
  
      // Verificar si el usuario existe
      if (!studentForms) {
        throw new InternalServerErrorException('¡No se encontró usuario registrado en el sistema!');
      }

      // Buscar que exista el tipo de documento
      const typeDocuments = await this.typeDocumentModel.findOne({ 
        where: { id:  updateRegisterStudentDto.typeDocumentsId},
      });

      // Verificar si el detalle del usuario existe
      if (!typeDocuments) {
        throw new InternalServerErrorException('¡No se encontró tipo de documento!');
      }

      // Buscar que exista el tipo de documento
      const program = await this.programsModel.findOne({ 
        where: { id:  updateRegisterStudentDto.programsId},
      });

      // Verificar si el detalle del usuario existe
      if (!program) {
        throw new InternalServerErrorException('¡No se encontró programa academico!');
      }

      // Buscar que exista el tipo de documento
      const typeProgram = await this.typeProgramsModel.findOne({ 
        where: { id:  updateRegisterStudentDto.typeProgramsId},
      });

      // Verificar si el detalle del usuario existe
      if (!typeProgram) {
        throw new InternalServerErrorException('¡No se encontró tipo de programa academico!');
      }

      // Buscar que exista el tipo de documento
      const group = await this.groupsModel.findOne({ 
        where: { id:  updateRegisterStudentDto.groupsId},
      });

      // Verificar si el detalle del usuario existe
      if (!group) {
        throw new InternalServerErrorException('¡No se encontró grupo de estudio!');
      }

      // Actualizar las propiedades del inscrito
      // Actualizar campos
      studentForms.names = updateRegisterStudentDto.names;
      studentForms.sureNames = updateRegisterStudentDto.sureNames;
      studentForms.documentNumber = updateRegisterStudentDto.documentNumber;
      studentForms.expeditionPlace = updateRegisterStudentDto.expeditionPlace;
      studentForms.age = updateRegisterStudentDto.age;
      studentForms.email = updateRegisterStudentDto.email;
      studentForms.bornDate = updateRegisterStudentDto.bornDate;
      studentForms.neighborhood = updateRegisterStudentDto.neighborhood;
      studentForms.address = updateRegisterStudentDto.address;
      studentForms.phoneNumber = updateRegisterStudentDto.phoneNumber;
      studentForms.secondPhoneNumber = updateRegisterStudentDto.secondPhoneNumber;
      studentForms.graduationYear = updateRegisterStudentDto.graduationYear;
      studentForms.agent = updateRegisterStudentDto.agent;
      studentForms.documents = updateRegisterStudentDto.documents;
      studentForms.observation = updateRegisterStudentDto.observation;

      // Relaciones
      studentForms.typeDocuments = typeDocuments;
      studentForms.program = program;
      studentForms.typeProgram = typeProgram;
      studentForms.group = group;

      const updatedForm = await this.studentFormsModel.save(studentForms);

      // elimina registros de ciclos en caso de tenerlos y los actualiza
      await this.studentFormsCyclesModel.delete({
        studentForms: studentForms,
      });

      // 2. Crea los registros en studentFormsCycles si cyclesContent viene en el DTO
      if (cyclesContent && Array.isArray(cyclesContent)) {
        for (const cycle of cyclesContent) {
          await this.studentFormsCyclesModel.save({
            studentForms: updatedForm,
            cycles: { id: cycle.cyclesId },
            contents: cycle.contentId ? { id: cycle.contentId } : null,
          });
        }
      }

      return updatedForm;
  
    } catch (err) {
      // Manejo de errores
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err.message || err}`);
    }
  }

  public async getAllRegisteredStudents(user: User): Promise<any> {
    try {
      const displayedColumns: string[] = [ 
        '#',  
        'Nombre',
        'Tipo de Documento',
        'Número de Documento',
        'Tipo de Programa',
        'Estado', 
        'Fecha creación'
      ]; 
  
      const columnMappings: { [key: string]: string } = {
        '#':                   'index',
        'Nombre':              'fullName',
        'Tipo de Documento':   'documentName',
        'Número de Documento': 'documentNumber',
        'Tipo de Programa':    'typeProgramName',
        'Estado':              'status',
        'Fecha creación':      'createAt'
      };

      const values = await this.studentFormsModel.find({
        relations: ['typeDocuments', 'program', 'program.typeModality', 'typeProgram', 'group']
      })

      const processedValues = values.map((studentProgram, index) => {
        // Extraemos las propiedades de userDetail (suponiendo que hay un solo detalle)
        const { typeDocuments, program, group, typeProgram, ...rest} = studentProgram; // Solo tomamos el primer detalle
      
        return {
          // Detalle
          index: index + 1,
          id: rest.id,
          names: rest.names,
          sureNames: rest.sureNames,
          fullName: `${rest.names} ${rest.sureNames}`,
          documentName: typeDocuments.documentName,  
          documentNumber: rest.documentNumber,      
          phoneNumber: rest.phoneNumber,
          programName: program?.programName,
          typeProgramName: typeProgram.type,
          typeModalityName: program?.typeModality?.modalityName,
          email: rest.email,
          createAt: rest.createAt,
          createTime: rest.createTime,
          updateAt: rest.updateAt,
          updateTime: rest.updateTime,
          status: rest.isActive ? this.generalStatus.Active : this.generalStatus.Inactive,
          selectedRow: false,

          // Detalle Programa
          program: program,
          
          // Detalle Tipo de Programa
          typeProgram: typeProgram,
          
          // Detalle Tipo de Modalidad
          modality: program?.typeModality,

          // Detalle Grupo
          group: group?.groupName,
        };
      });
        
      return { 
        displayedColumns, 
        columnMappings, 
        values: processedValues 
      };
    } catch (error) {
      // Manejo de errores
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message || error}`);   
    }
  }

  public async deleteRegisterStudent(id: number): Promise<any> {
    try {
      
      const studentForms = await this.studentFormsModel.findOne({
        where: {
          id: id
        },
        relations: ['typeDocuments', 'program', 'program.typeModality', 'program.typeProgram', 'typeProgram', 'group']
      })

      // Verificar si el detalle del usuario existe
      if (!studentForms) {
        throw new InternalServerErrorException('¡No se encontró registro para procesar!');
      }

      const deletedRow = this.studentFormsModel.delete(id);

      // elimina registros de ciclos en caso de tenerlos y los actualiza
      await this.studentFormsCyclesModel.delete({
        studentForms: studentForms,
      });

      return studentForms;
      
    } catch (error) {
      // Manejo de errores
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message || error}`);   
    }
  }
}
