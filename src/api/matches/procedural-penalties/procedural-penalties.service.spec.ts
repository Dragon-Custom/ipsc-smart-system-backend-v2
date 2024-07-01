import { Test, TestingModule } from '@nestjs/testing';
import { ProceduralPenaltiesService } from './procedural-penalties.service';

describe('ProceduralPenaltiesService', () => {
  let service: ProceduralPenaltiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProceduralPenaltiesService],
    }).compile();

    service = module.get<ProceduralPenaltiesService>(ProceduralPenaltiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
