import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { State } from "./states.entity";
import { UserDetail } from "src/controllers/user/entities/user-detail.entity";

@Entity('cities')
export class City {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    // Relación con el país: Un estado pertenece a un país
    @ManyToOne(() => State, state => state.cities, { nullable: false })
    @JoinColumn({ name: 'statesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_statesId',  }) // clave foránea no puede ser nula
    state: State;  // País al que pertenece el estado

    @OneToMany(() => UserDetail, userDetail => userDetail.city)
    userDetails: UserDetail[];

    @ApiProperty()
    @Column({ comment: 'Nombre de Ciudad' })
    cityName: string;

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