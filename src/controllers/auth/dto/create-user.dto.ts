import { IsEmail, IsNumber, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @MinLength(3, { message: 'El primer nombre debe contener un minimo de 3 caracteres' })
  firstName: string;

  @IsOptional()
  @IsString()
  @ValidateIf((obj) => obj.secondName !== '')
  @MinLength(3, { message: 'El segundo nombre debe contener un minimo de 3 caracteres' })
  secondName?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El primer apellido debe contener un minimo de 3 caracteres' })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((obj) => obj.sureName !== '')
  @MinLength(3, { message: 'El segundo nombre debe contener un minimo de 3 caracteres' }) 
  sureName?: string;

  @IsNumber({}, { message: 'El tipo de documento es requerido y debe ser númerico' })
  typeDocumentsId: number;

  @IsNumber({}, { message: 'El número de documento es requerido y debe ser númerico' })
  documentNumber: number;

  @IsEmail()
  @MinLength(10, { message: 'El primer nombre debe contener un minimo de 3 caracteres' })
  email: string;

  @MinLength(8, { message: 'La contraseña debe contener un minimo de 8 caracteres' })
  password: string;

  @IsOptional()
  @IsNumber()
  phoneNumber?: number;

  @IsNumber({}, { message: 'El identificador del rol es requerido y debe ser númerico' })
  rolesId?: number;

  @IsNumber({}, { message: 'El identificador del pais es requerido y debe ser númerico' })
  countriesId: number;

  @IsNumber({}, { message: 'El identificador del estado es requerido y debe ser númerico' })
  statesId: number;

  @IsNumber({}, { message: 'El identificador de la ciudad es requerido y debe ser númerico' })
  citiesId: number;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre de la persona de contacto requerido' })
  closePersonNames?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'El número telefonico de la referencia de contacto debe ser de 10 digitos' })
  closePersonPhone?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
