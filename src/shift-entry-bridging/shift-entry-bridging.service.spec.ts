import { Test, TestingModule } from '@nestjs/testing';
import { ShiftEntryBridgingService } from './shift-entry-bridging.service';

describe('ShiftEntryBridgingService', () => {
  let service: ShiftEntryBridgingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShiftEntryBridgingService],
    }).compile();

    service = module.get<ShiftEntryBridgingService>(ShiftEntryBridgingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
