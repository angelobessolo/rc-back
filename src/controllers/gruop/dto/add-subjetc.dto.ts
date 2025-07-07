import { ArrayNotEmpty, IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class AddSubjectDto {
	@IsNumber({}, {message: 'cordinationsId - Identificador de la coordinación debe ser númerico'})
  	cordinationsId: number;

	@IsNumber({}, {message: 'groupsId - Identificador del grupo debe ser númerico'})
	groupsId: number;
	
	@ArrayNotEmpty()
	@IsNumber({}, {each: true, message: 'subjectsId - Debe ser un array numerico y no puede estar vacio'})
	subjectsId: number[];
}
