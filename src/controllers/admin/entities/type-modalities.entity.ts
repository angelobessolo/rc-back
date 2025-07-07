import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('typeModalities')
export class TypeModality {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ comment: 'Tipo de Modalidad' })
    modalityName: string;

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