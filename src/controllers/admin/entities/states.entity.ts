import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./countries.entity";
import { City } from "./cities.entity";
import { UserDetail } from "src/controllers/user/entities/user-detail.entity";

@Entity('states')
export class State {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    // Relación con el país: Un estado pertenece a un país
    @ManyToOne(() => Country, country => country.states, { nullable: false })
    @JoinColumn({ name: 'countriesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_countriesId' }) // clave foránea no puede ser nula
    country: Country;  // País al que pertenece el estado

    // Relación con departamentos: Un país tiene muchos departamentos
    @OneToMany(() => City, city => city.state)
    cities: City[];

    @ApiProperty()
    @Column({ comment: 'Nombre del Estado' })
    stateName: string;

    @OneToMany(() => UserDetail, userDetail => userDetail.state)
    userDetails: UserDetail[];

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