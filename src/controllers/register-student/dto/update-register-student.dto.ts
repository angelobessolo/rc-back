import { PartialType } from '@nestjs/swagger';
import { CreateRegisterStudentDto } from './create-register-student.dto';

export class UpdateRegisterStudentDto extends PartialType(CreateRegisterStudentDto) {}
