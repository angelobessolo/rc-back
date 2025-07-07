import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/controllers/gruop/entities/group.entity";
import { Program } from "src/controllers/program/entities/program.entity";
import { TypeDocuments } from "src/controllers/type-documents/entities/documents.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { StudentForms } from "./student-forms.entity";
import { Cycle } from "src/controllers/admin/entities/cycles.entity";
import { Content } from "src/controllers/admin/entities/contents.entity";

@Unique(['studentForms', 'cycles', 'contents'])
@Entity('studentFormsCycles')
export class StudentFormsCycles {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

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


  // Relaciones
  @ApiProperty({ type: () => StudentForms })
  @ManyToOne(() => StudentForms, (studentForms) => studentForms.studentFormsCycles, { nullable: false })
  @JoinColumn({ name: 'studentFormsId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_studentFormsCycles_studentForms' })
  studentForms: StudentForms;

  @ApiProperty({ type: () => Cycle })
  @ManyToOne(() => Cycle, { nullable: false })
  @JoinColumn({ name: 'cyclesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_studentFormsCycles_cycles' })
  cycles: Cycle;

  @ApiProperty({ type: () => Content })
  @ManyToOne(() => Content, { nullable: true })
  @JoinColumn({ name: 'contentsId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_studentFormsCycles_contents' })
  contents: Content;

  
}
