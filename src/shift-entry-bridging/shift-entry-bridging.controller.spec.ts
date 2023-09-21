import { Test, TestingModule } from '@nestjs/testing';
import { ShiftEntryBridgingController } from './shift-entry-bridging.controller';
import { ShiftEntryBridgingService } from './shift-entry-bridging.service';

describe('ShiftEntryBridgingController', () => {
  let controller: ShiftEntryBridgingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftEntryBridgingController],
      providers: [ShiftEntryBridgingService],
    }).compile();

    controller = module.get<ShiftEntryBridgingController>(ShiftEntryBridgingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
