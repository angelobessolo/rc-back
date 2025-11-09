import {IsArray, IsEmail, isNumber, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNumber()
  cordinationsId: number;
    
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  secondName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsString() 
  sureName: string;

  @IsNumber()
  typeDocumentsId: number;

  @IsNumber()
  documentNumber: number;
 
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsOptional()
  @IsNumber()
  phoneNumber?: number;

  @IsNumber()
  rolesId?: number;

  @IsNumber()
  countriesId: number;

  @IsNumber()
  statesId: number;

  @IsNumber()
  citiesId: number;

  @IsOptional()
  @IsString()
  closePersonNames?: string;

  @IsOptional()
  @IsString()
  closePersonPhone?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
