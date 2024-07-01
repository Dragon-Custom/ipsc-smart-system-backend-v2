import { Test, TestingModule } from '@nestjs/testing';
import { MatchStagesService } from './match-stages.service';

describe('MatchStagesService', () => {
  let service: MatchStagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchStagesService],
    }).compile();

    service = module.get<MatchStagesService>(MatchStagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
