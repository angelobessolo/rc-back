import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { StudentForms } from "src/controllers/register-student/entities/student-forms.entity";
import { StudentFormsCycles } from "src/controllers/register-student/entities/student-forms-cycle.entity";

@Entity('cycles')
@Unique(['cycleNumber'])
export class Cycle {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ comment: 'Numero del ciclo' })
  cycleNumber: number;

  @ApiProperty()
  @Column({ comment: 'Descripción del ciclo' })
  description: string;

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

  @OneToMany(() => StudentFormsCycles, (studentFormsCycles) => studentFormsCycles.cycles)
  studentFormsCycles: StudentFormsCycles[];
}