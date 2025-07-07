import { PartialType } from '@nestjs/swagger';
import { CreateGruopDto } from './create-group.dto';

export class UpdateGruopDto extends PartialType(CreateGruopDto) {}
