import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { State } from "./states.entity";
import { UserDetail } from "src/controllers/user/entities/user-detail.entity";

@Entity('cities')
export class City {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => State, state => state.cities, { nullable: false })
  @JoinColumn({ name: 'statesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_statesId',  })
  state: State;

  @OneToMany(() => UserDetail, userDetail => userDetail.city)
  userDetails: UserDetail[];

  @ApiProperty()
  @Column({ comment: 'Nombre de Ciudad' })
  cityName: string;

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