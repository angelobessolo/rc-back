import { PartialType } from '@nestjs/swagger';
import { CreateTypeModalityDto } from './create-type-modality.dto';

export class UpdateModalityTypeDto extends PartialType(CreateTypeModalityDto) {}
