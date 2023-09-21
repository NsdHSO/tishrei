import { PartialType } from '@nestjs/mapped-types';
import { CreateShiftEntryBridgingDto } from './create-shift-entry-bridging.dto';

export class UpdateShiftEntryBridgingDto extends PartialType(CreateShiftEntryBridgingDto) {}
