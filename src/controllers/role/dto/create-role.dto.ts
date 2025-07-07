import { ArrayNotEmpty, IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    
    @IsString()
    roleName: string;

    @IsOptional()
    @IsNumber()
    isActive?: number;
}
