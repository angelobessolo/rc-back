import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateRegisterStudentDto {
  @IsNumber({}, {message: 'Tipo de programa es requerido'})
  typeProgramsId: number;

  @IsString({message: 'Nombre es requerido'})
  names: string;

  @IsString({message: 'Apellidos son requeridos'})
  sureNames: string;

  @IsNumber({}, {message: 'El identificador de documento es requerido'})
  typeDocumentsId: number;

  @IsNumber({}, {message: 'Número de documento es requerido'})
  documentNumber: number;
 
  @IsString({message: 'Lugar de expedición del documento es requerido'})
  expeditionPlace: string;

  @IsNumber({}, {message: 'Edad es requerida'})
  age: number;

  @IsString({message: 'Correo electronico es requerido'})
  email: string;

  @IsString({message: 'Fecha de nacimiento es requerida'})
  bornDate: string;

  @IsString({message: 'Departamento de residencia es requerida'})
  state: string;

  @IsString({message: 'Ciudad de residencia es requerida'})
  city: string;

  @IsString({message: 'Barrio o localidad de residencia es requerida'})
  neighborhood: string;

  @IsString({message: 'Dirección de residencia es requerida'})
  address: string;

  @IsNumber({}, {message: 'Número de contacto principal es requerido'})
  phoneNumber: number;

  @IsOptional()
  @IsNumber()
  secondPhoneNumber?: number;

  @IsOptional()
  @IsNumber()
  graduationYear?: number;

  @IsOptional()
  @IsString()
  agent?: string;

  @IsOptional()
  @IsString()
  documents?: string;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsNumber()
  programsId?: number;
  
  @IsOptional()
  @IsNumber()
  cyclesProgramsId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CycleContentDto)
  cyclesContent?: CycleContentDto[];
  
  @IsOptional()
  @IsNumber()
  groupsId?: number;
}

export class CycleContentDto {
  @IsOptional()
  @IsNumber()
  cyclesId?: number;

  @IsOptional()
  @IsNumber()
  contentId?: number;
}
