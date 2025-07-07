import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProgramDto {

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    cordinationsId: number;
    
    @IsNumber()
    typeModalitiesId: number;

    @IsNumber()
    typeProgramsId: number;

    @IsString()
    programName: string;

    @IsNumber()
    amountMonth: number;

    @IsOptional()
    @IsNumber()
    amountSubjects?: number;

    @IsNumber()
    price: number;
}
