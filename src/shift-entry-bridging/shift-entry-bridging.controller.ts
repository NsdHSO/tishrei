import {
  Body, Controller, Delete, Get, Param, Patch, Post,
} from '@nestjs/common';
import {ShiftEntryBridgingService} from './shift-entry-bridging.service';
import {
  CreateShiftEntryBridgingDto,
} from './dto/create-shift-entry-bridging.dto';
import {
  UpdateShiftEntryBridgingDto,
} from './dto/update-shift-entry-bridging.dto';

@Controller('shift-entry-bridging')
export class ShiftEntryBridgingController {
  constructor(private readonly shiftEntryBridgingService: ShiftEntryBridgingService) {}

  @Post()
  async create(@Body() createShiftEntryBridgingDto: CreateShiftEntryBridgingDto) {
    try {
      // Save the new ShiftEntryBridging entity to the database
      return this.shiftEntryBridgingService.create(createShiftEntryBridgingDto)
        .then(value => {
          return {
            entry_time : value.entry_time,
            id : value.id,
          };
        })
        .catch(error => ({
          success : false,
          error : 'Failed to create shift entry',
          message : error.message,
        }));
    } catch (error) {
      // Handle the error and return an error response
      return {
        success : false,
        error : 'Failed to create shift entry',
        message : error.message,
      };
    }
  }

  @Get() findAll() {
    return this.shiftEntryBridgingService.findAll();
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.shiftEntryBridgingService.findOne(+id);
  }

  @Patch(':id') update(@Param('id') id: string,
    @Body() updateShiftEntryBridgingDto: UpdateShiftEntryBridgingDto,
  ) {
    console.log(updateShiftEntryBridgingDto);
    return this.shiftEntryBridgingService.update(+id,
      updateShiftEntryBridgingDto,
    );
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.shiftEntryBridgingService.remove(+id);
  }
}
