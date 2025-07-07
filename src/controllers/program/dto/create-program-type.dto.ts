import {IsArray, IsEmail, isNumber, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProgramTypeDto {

    @IsOptional()
    @IsNumber()
    id?: number;
    
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
    documentsId: number;

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
