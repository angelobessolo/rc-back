import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateStatusDto {
  @IsBoolean()
  isActive: boolean
}
