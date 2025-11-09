import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ModuleDTO } from "./moduleDto";

export class UpdateRoleModuleDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ModuleDTO)
  modules: ModuleDTO[];
}
