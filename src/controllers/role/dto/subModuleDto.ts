import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubModuleDTO {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  subModuleName: string;

  @IsString()
  @IsNotEmpty()
  subModuleIcon: string;

  @IsString()
  @IsNotEmpty()
  subModuleRoute: string;

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
}
