import { ApiProperty } from "@nestjs/swagger";
import { City } from "src/controllers/admin/entities/cities.entity";
import { Country } from "src/controllers/admin/entities/countries.entity";
import { State } from "src/controllers/admin/entities/states.entity";
import { TypeDocuments } from "src/controllers/type-documents/entities/documents.entity";
import { User } from "src/controllers/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('userDetails')
export class UserDetail {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => User, user => user.userDetail, { nullable: false })
    @JoinColumn({ name: 'usersId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_userDetails_usersId' })
    user: User; 

    @ManyToOne(() => TypeDocuments, typeDocumentsId => typeDocumentsId.userDetail, { nullable: false })
    @JoinColumn({ name: 'typeDocumentsId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_userDetails_typeDocumentsId' }) // clave foránea no puede ser nula
    typeDocuments: TypeDocuments;  

    @ApiProperty()
    @Column({ comment: 'Numero de Documento' })  
    documentNumber: number;

    @ApiProperty()
    @Column({ comment: 'Primer Nombre' })  
    firstName: string;

    @ApiProperty()
    @Column({ nullable: true, comment: 'Segundo Nombre' })  
    secondName: string;

    @ApiProperty()
    @Column({ comment: 'Primer Apellido' })  
    lastName: string;

    @ApiProperty()
    @Column({ nullable: true, comment: 'Segundo Apellido' })  
    sureName: string;

    @ApiProperty()
    @Column({ nullable: true, comment: 'Numero de Celular' })  
    phoneNumber: number;
    
    @ApiProperty()
    @Column({ comment: 'Correo Electronico' })  
    email: string;

    @ApiProperty()
    @Column({ nullable: true, comment: 'Foto de Perfil Base64' })  
    photo: string;

    @ManyToOne(() => Country, country => country.userDetails, { nullable: false })
    @JoinColumn({ name: 'countriesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_userDetails_countriesId' })
    country: Country; 

    @ManyToOne(() => State, state => state.userDetails, { nullable: false })
    @JoinColumn({ name: 'statesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_userDetails_statesId' })
    state: State; 

    @ManyToOne(() => City, city => city.userDetails, { nullable: false })
    @JoinColumn({ name: 'citiesId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_userDetails_citiesId' })
    city: City; 

    @ApiProperty()
    @Column({ comment: 'Persona de Contacto' })  
    closePersonNames: string;

    @ApiProperty()
    @Column({ comment: 'Número Persona de Contacto' })  
    closePersonPhone: string;

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
