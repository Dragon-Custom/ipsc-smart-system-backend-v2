import { Test, TestingModule } from '@nestjs/testing';
import { ScoreProceduralPenaltiesService } from './score-procedural-penalties.service';

describe('ScoreProceduralPenaltiesService', () => {
  let service: ScoreProceduralPenaltiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreProceduralPenaltiesService],
    }).compile();

    service = module.get<ScoreProceduralPenaltiesService>(ScoreProceduralPenaltiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
