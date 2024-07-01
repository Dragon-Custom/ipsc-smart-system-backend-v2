import { Test, TestingModule } from '@nestjs/testing';
import { DqReasonsService } from './dq-reasons.service';

describe('DqReasonsService', () => {
  let service: DqReasonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DqReasonsService],
    }).compile();

    service = module.get<DqReasonsService>(DqReasonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
