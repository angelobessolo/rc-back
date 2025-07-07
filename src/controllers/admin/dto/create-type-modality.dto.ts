import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTypeModalityDto {
  @IsNumber({}, {message: 'El identificador de la coordinación es requerido'})
  cordinationsId: number
  
  @IsString()
  @MinLength(5, {message: 'El nombre del tipo de modalidad debe tener al menos 5 caracteres'})
  modalityName: string

  @IsOptional()
  @IsBoolean()
  isActive: boolean
}
