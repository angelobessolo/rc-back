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

    // Relación con departamentos: Un país tiene muchos departamentos
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
  
    // Campo de solo fecha (tipo 'date')
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