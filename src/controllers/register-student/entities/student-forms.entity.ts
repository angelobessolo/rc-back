import { ApiProperty } from "@nestjs/swagger";
import { TypeProgram } from "src/controllers/admin/entities/type-programs.entity";
import { Group } from "src/controllers/gruop/entities/group.entity";
import { Program } from "src/controllers/program/entities/program.entity";
import { TypeDocuments } from "src/controllers/type-documents/entities/documents.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { StudentFormsCycles } from "./student-forms-cycle.entity";

@Unique(['documentNumber', 'typeProgram'])
@Entity('studentForms')
export class StudentForms {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ comment: 'Nombres' })  
  names: string;

  @ApiProperty()
  @Column({ comment: 'Apellidos' })  
  sureNames: string;

  @ApiProperty()
  @Column({ comment: 'Número de Documento' })  
  documentNumber: number;

  @ApiProperty()
  @Column({ comment: 'Lugar de Expedición' })  
  expeditionPlace: string;

  @ApiProperty()
  @Column({ comment: 'Edad' })  
  age: number;

  @ApiProperty()
  @Column({ comment: 'Correo Electronico' })  
  email: string;

  @ApiProperty()
  @Column({ comment: 'Fecha de Nacimiento' })  
  bornDate: string;

  @ApiProperty()
  @Column({ comment: 'Departamento' })  
  state: string;

  @ApiProperty()
  @Column({ comment: 'Ciudad' })  
  city: string;

  @ApiProperty()
  @Column({ comment: 'Barrio' })  
  neighborhood: string;

  @ApiProperty()
  @Column({ comment: 'Dirección' })  
  address: string;

  @ApiProperty()
  @Column({ comment: 'Número de Telefono' })  
  phoneNumber: number;

  @ApiProperty()
  @Column({ comment: 'Segundo Número de Telefono' })  
  secondPhoneNumber: number;

  @ApiProperty()
  @Column({ comment: 'Año de Graduación' })  
  graduationYear: number;

  @ApiProperty()
  @Column({ comment: 'Asesor Comercial' })  
  agent: string;

  @ApiProperty()
  @Column({ comment: 'Documentos Entregados' })  
  documents: string;

  @ApiProperty()
  @Column({ comment: 'Observación' })
  observation: string

  @ApiProperty()
  @Column({ type: 'tinyint', default: 1, comment: 'Estado: 1 Activo - 0 Inactivo' })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'date', default: () => "CURRENT_DATE", comment: 'Fecha de Creación' })  
  createAt: string;

  @ApiProperty()
  @Column({ type: 'time', default: () => "CURRENT_TIME", comment: 'Hora de Creación' })  
  createTime: string; 

  @ApiProperty()
  @Column({ type: 'date', default: () => "CURRENT_DATE", comment: 'Fecha de Actualización' })  
  updateAt: string;  
  
  @ApiProperty()
  @Column({ type: 'time', default: () => "CURRENT_TIME", comment: 'Hora de Actualización' })  
  updateTime: string;


  @ApiProperty({ type: () => TypeDocuments })
  @ManyToOne(() => TypeDocuments, (typeDocument) => typeDocument.studentForm, { nullable: false })
  @JoinColumn({name: 'typeDocumentsId', referencedColumnName: 'id',foreignKeyConstraintName: 'fk_studentForms_programs'})
  typeDocuments: TypeDocuments;

  @ApiProperty({ type: () => Program })
  @ManyToOne(() => Program, (program) => program.studentForms, { nullable: false })
  @JoinColumn({name: 'programsId', referencedColumnName: 'id',foreignKeyConstraintName: 'fk_studentForms_programs'})
  program: Program;

  @ApiProperty()
  @Column({ comment: 'Identificador de Programa para bachiller por ciclo' })  
  cyclesProgramsId: number;

  @ApiProperty({ type: () => TypeProgram })
  @ManyToOne(() => TypeProgram, (typeProgram) => typeProgram.studentForms, { nullable: false })
  @JoinColumn({name: 'typeProgramsId', referencedColumnName: 'id',foreignKeyConstraintName: 'fk_studentForms_typePrograms'})
  typeProgram: TypeProgram;

  @ApiProperty({ type: () => Group })
  @ManyToOne(() => Group, group => group.studentForm, { nullable: false })
  @JoinColumn({ name: 'groupsId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_studentForms_groups' })
  group: Group;

  @OneToMany(() => StudentFormsCycles, (studentFormsCycles) => studentFormsCycles.studentForms)
  studentFormsCycles: StudentFormsCycles[];
}
