import { ApiProperty } from "@nestjs/swagger";
import { UserDetail } from "src/controllers/user/entities/user-detail.entity";
import { StudentForms } from "src/controllers/register-student/entities/student-forms.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('typedocuments')
@Unique(['documentName'])
export class TypeDocuments {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserDetail, userDetail => userDetail.typeDocuments)
  userDetail: UserDetail[];

  @OneToMany(() => StudentForms, studentForm => studentForm.typeDocuments)
  studentForm: StudentForms[];

  @ApiProperty()
  @Column({ comment: 'Descripción Tipo Documento'})
  documentName: string;

  @ApiProperty()
  @Column({ default: true, comment: 'Estado: 1 Activo - 0 Inactivo' })
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