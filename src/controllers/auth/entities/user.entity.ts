import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/controllers/role/entities/role.entity";
import { UserDetail } from "src/controllers/user/entities/user-detail.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number; 
  
  @ApiProperty({ type: () => UserDetail })
  @OneToOne(() => UserDetail, userDetail => userDetail.user)
  userDetail: UserDetail;

  @ApiProperty()
  @Column({ unique: true, comment: 'Correo Electronico' })  
  email: string;

  @ApiProperty()
  @Column({ comment: 'Contraseña de Cuenta' })  
  password?: string;

  @ApiProperty()
  @Column({ comment: 'Nombre de Usuario' })  
  userName: string;

  @ApiProperty()
  @ManyToOne(() => Role, role => role.users, {nullable: false})  
  @JoinColumn({ name: 'rolesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_users_rolesId' })
  role: Role;

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
