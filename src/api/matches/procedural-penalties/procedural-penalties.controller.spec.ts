import { Test, TestingModule } from '@nestjs/testing';
import { ProceduralPenaltiesController } from './procedural-penalties.controller';
import { ProceduralPenaltiesService } from './procedural-penalties.service';

describe('ProceduralPenaltiesController', () => {
  let controller: ProceduralPenaltiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProceduralPenaltiesController],
      providers: [ProceduralPenaltiesService],
    }).compile();

    controller = module.get<ProceduralPenaltiesController>(ProceduralPenaltiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
