import { ArrayNotEmpty, IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoleModuleDto {
    
    @IsNumber()
    rolesId: number;

    @IsNumber()
    modulesId: number;

    @IsNumber()
    subModulesId: number;

}
