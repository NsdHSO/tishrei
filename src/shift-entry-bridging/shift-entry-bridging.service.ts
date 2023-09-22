import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateShiftEntryBridgingDto } from './dto/create-shift-entry-bridging.dto';
import { UpdateShiftEntryBridgingDto } from './dto/update-shift-entry-bridging.dto';
import { ShiftEntryBridging } from './entities/shift-entry-bridging.entity';

@Injectable()
export class ShiftEntryBridgingService {
  constructor(
    @InjectRepository(ShiftEntryBridging)
    private readonly shiftEntryBridgingRepository: Repository<ShiftEntryBridging>,
    @Inject(UserService) private readonly userSerivice: UserService,
  ) {}

  async create(
    createShiftEntryBridgingDto: CreateShiftEntryBridgingDto,
  ): Promise<ShiftEntryBridging> {
    const newShiftEntry = new ShiftEntryBridging();
    newShiftEntry.entry_time = createShiftEntryBridgingDto.entry_time;
  
    try {
      const user = await this.userSerivice.findOne(createShiftEntryBridgingDto.user.employee_id);
  
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
  
      newShiftEntry.user = user;
  
      return this.shiftEntryBridgingRepository.save(newShiftEntry);
    } catch (error) {
      // Handle errors here
      throw new HttpException('Failed to create shift entry', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<ShiftEntryBridging[]> {
    return this.shiftEntryBridgingRepository.find();
  }

  async findOne(id: number): Promise<ShiftEntryBridging | undefined> {
    return this.shiftEntryBridgingRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateShiftEntryBridgingDto: UpdateShiftEntryBridgingDto,
  ): Promise<ShiftEntryBridging | undefined> {
    console.log(updateShiftEntryBridgingDto);
    await this.shiftEntryBridgingRepository.update(
      id,
      updateShiftEntryBridgingDto,
    );
    return this.shiftEntryBridgingRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.shiftEntryBridgingRepository.delete(id);
  }
}
