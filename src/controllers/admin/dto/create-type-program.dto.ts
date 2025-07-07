import { IsBoolean, IsNumber, IsOptional, IsString, MinLength, minLength } from "class-validator";

export class CreateTypeProgramDto {
    @IsNumber({}, {message: 'El identificador de la coordinación es requerido'})
    cordinationsId: number

    @IsString()
    @MinLength(5, {message: 'El nombre del tipo de programa debe tener al menos 5 caracteres'})
    type: string

    @IsOptional()
    @IsBoolean()
    isActive: boolean
}
