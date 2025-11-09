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

  @ManyToOne(() => Country, country => country.states, { nullable: false })
  @JoinColumn({ name: 'countriesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_countriesId' })
  country: Country; 

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