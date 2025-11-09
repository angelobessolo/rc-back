import { IsOptional, IsString } from "class-validator";

export class CreateDocumentDto {
  @IsString()
  documentName: string

  @IsOptional()
  @IsString()
  isActive: boolean
}
