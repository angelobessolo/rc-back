import { ArrayNotEmpty, IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGruopDto {
	@IsNumber()
	programsId: number;

	@IsString()
	groupName: string;
}
