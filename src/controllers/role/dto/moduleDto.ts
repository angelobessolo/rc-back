import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SubModuleDTO } from './subModuleDto';

export class ModuleDTO {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  moduleName: string;

  @IsString()
  @IsNotEmpty()
  moduleIcon: string;

  @IsString()
  @IsNotEmpty()
  moduleRoute: string;

  @IsNumber()
  isActive: number;

  @IsDateString()
  @IsNotEmpty()
  createAt: string;

  @IsString()
  @IsNotEmpty()
  createTime: string;

  @IsDateString()
  @IsNotEmpty()
  updateAt: string;

  @IsString()
  @IsNotEmpty()
  updateTime: string;

  @ValidateNested({ each: true })
  @Type(() => SubModuleDTO)
  submodules: SubModuleDTO[];
}
