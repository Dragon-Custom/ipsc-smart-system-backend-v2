import { Test, TestingModule } from '@nestjs/testing';
import { ScoreProceduralPenaltiesController } from './score-procedural-penalties.controller';
import { ScoreProceduralPenaltiesService } from './score-procedural-penalties.service';

describe('ScoreProceduralPenaltiesController', () => {
  let controller: ScoreProceduralPenaltiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreProceduralPenaltiesController],
      providers: [ScoreProceduralPenaltiesService],
    }).compile();

    controller = module.get<ScoreProceduralPenaltiesController>(ScoreProceduralPenaltiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
