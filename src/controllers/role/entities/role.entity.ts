import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/controllers/auth/entities/user.entity";

@Entity('roles')
@Unique(['roleName'])
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, comment: 'Nombre del Rol' })
  roleName: string;

  @ApiProperty()
  @Column({ type: 'tinyint', default: 1, comment: 'Estado: 1 Activo - 0 Inactivo' })
  isActive: number;

  @OneToMany(() => User, user => user.role) 
  users: User[];  

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
