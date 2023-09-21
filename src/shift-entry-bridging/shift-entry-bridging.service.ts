import {Inject, Injectable} from '@nestjs/common';
import {
  CreateShiftEntryBridgingDto,
} from './dto/create-shift-entry-bridging.dto';
import {
  UpdateShiftEntryBridgingDto,
} from './dto/update-shift-entry-bridging.dto';
import {ShiftEntryBridging} from './entities/shift-entry-bridging.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {UserService} from '../user/user.service';

@Injectable()
export class ShiftEntryBridgingService {
  constructor(
    @InjectRepository(ShiftEntryBridging) private readonly shiftEntryBridgingRepository: Repository<ShiftEntryBridging>,
    @Inject(UserService) private readonly userSerivice: UserService,
  ) {}

  async create(createShiftEntryBridgingDto: CreateShiftEntryBridgingDto): Promise<ShiftEntryBridging> {
    const newShiftEntry = new ShiftEntryBridging();
    newShiftEntry.entry_time = createShiftEntryBridgingDto.entry_time;
    await this.userSerivice.findOne(createShiftEntryBridgingDto.id)
      .then(v => newShiftEntry.user = v)
      .catch(e => console.log(e));
    return this.shiftEntryBridgingRepository.save(newShiftEntry);
  }

  async findAll(): Promise<ShiftEntryBridging[]> {
    return this.shiftEntryBridgingRepository.find();
  }

  async findOne(id: number): Promise<ShiftEntryBridging | undefined> {
    return this.shiftEntryBridgingRepository.findOneBy({ id });
  }

  async update(id: number,
    updateShiftEntryBridgingDto: UpdateShiftEntryBridgingDto,
  ): Promise<ShiftEntryBridging | undefined> {
    console.log(updateShiftEntryBridgingDto);
    await this.shiftEntryBridgingRepository.update(id,
      updateShiftEntryBridgingDto,
    );
    return this.shiftEntryBridgingRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.shiftEntryBridgingRepository.delete(id);
  }
}
