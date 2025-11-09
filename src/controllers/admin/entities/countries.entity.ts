import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { State } from "./states.entity";
import { UserDetail } from "src/controllers/user/entities/user-detail.entity";

@Entity('countries')
export class Country {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => State, state => state.country)
  states: State[];

  @ApiProperty()
  @Column({ comment: 'Nombre del Pais' })
  countryName: string;

  @OneToMany(() => UserDetail, userDetail => userDetail.country)
  userDetails: UserDetail[];

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