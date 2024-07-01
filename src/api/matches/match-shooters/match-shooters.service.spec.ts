import { Test, TestingModule } from '@nestjs/testing';
import { MatchShootersService } from './match-shooters.service';

describe('MatchShootersService', () => {
  let service: MatchShootersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchShootersService],
    }).compile();

    service = module.get<MatchShootersService>(MatchShootersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
