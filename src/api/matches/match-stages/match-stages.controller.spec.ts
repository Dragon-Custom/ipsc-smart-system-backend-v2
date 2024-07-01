import { Test, TestingModule } from '@nestjs/testing';
import { MatchStagesController } from './match-stages.controller';
import { MatchStagesService } from './match-stages.service';

describe('MatchStagesController', () => {
  let controller: MatchStagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchStagesController],
      providers: [MatchStagesService],
    }).compile();

    controller = module.get<MatchStagesController>(MatchStagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
