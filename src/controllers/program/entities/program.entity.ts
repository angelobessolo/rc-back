import { ApiProperty } from "@nestjs/swagger";
import { TypeModality } from "src/controllers/admin/entities/type-modalities.entity";
import { TypeProgram } from "src/controllers/admin/entities/type-programs.entity";
import { Group } from "src/controllers/gruop/entities/group.entity";
import { StudentForms } from "src/controllers/register-student/entities/student-forms.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('programs')
export class Program {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => StudentForms, (studentForms) => studentForms.program)
  studentForms: StudentForms[];

  @ApiProperty()
  @ManyToOne(() => TypeModality, { nullable: false })
  @JoinColumn({ name: 'typeModalitiesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_programs_typeModalitiesId' })
  typeModality: TypeModality;

  @ApiProperty()
  @ManyToOne(() => TypeProgram, { nullable: false })
  @JoinColumn({ name: 'typeProgramsId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_programs_typeProgramsId' })
  typeProgram: TypeProgram;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, comment: 'Nombre del Programa' })
  programName: string;

  @ApiProperty()
  @Column({ type: 'int', comment: 'Cantidad de Meses' })
  amountMonth: number;

  @ApiProperty()
  @Column({ type: 'int', comment: 'Cantidad de Materias' })
  amountSubjects: number;

  @ApiProperty()
  @Column({ type: 'int', comment: 'Precio del Programa' })
  price: number;

  @ApiProperty()
  @Column({ type: 'tinyint', default: 1, comment: 'Estado: 1 Activo - 0 Inactivo' })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'date', default: () => "CURRENT_DATE", comment: 'Fecha de Creación' })  
  createAt: string;  // Solo almacenará la fecha (YYYY-MM-DD)

  // Campo de solo hora (tipo 'time')
  @ApiProperty()
  @Column({ type: 'time', default: () => "CURRENT_TIME", comment: 'Hora de Creación' })  
  createTime: string;  // Solo almacenará la hora (HH:MM:SS)

  // Campo de solo fecha (tipo 'date')
  @ApiProperty()
  @Column({ type: 'date', default: () => "CURRENT_DATE", comment: 'Fecha de Actualización' })  
  updateAt: string;  // Solo almacenará la fecha (YYYY-MM-DD)
  
  // Campo de solo hora (tipo 'time')
  @ApiProperty()
  @Column({ type: 'time', default: () => "CURRENT_TIME", comment: 'Hora de Actualización' })  
  updateTime: string;  // Solo almacenará la hora (HH:MM:SS)
}
