import { PartialType } from '@nestjs/swagger';
import { CreateTypeProgramDto } from './create-type-program.dto';

export class UpdateProgramTypeDto extends PartialType(CreateTypeProgramDto) {}
