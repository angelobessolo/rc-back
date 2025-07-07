import { ApiProperty } from "@nestjs/swagger";
import { Program } from "src/controllers/program/entities/program.entity";
import { User } from "src/controllers/auth/entities/user.entity";
import { StudentForms } from "src/controllers/register-student/entities/student-forms.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('groups')
@Unique(['groupName'])
export class Group {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [StudentForms] })
  @OneToMany(() => StudentForms, studentForm => studentForm.group)
  studentForm: StudentForms[];

  @ApiProperty()
  @Column({ comment: 'Nombre del Grupo' })
  groupName: string;

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
}
