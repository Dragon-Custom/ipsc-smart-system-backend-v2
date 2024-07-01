import { Test, TestingModule } from '@nestjs/testing';
import { MatchShooterCategoriesService } from './match-shooter-categories.service';

describe('MatchShooterCategoriesService', () => {
  let service: MatchShooterCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchShooterCategoriesService],
    }).compile();

    service = module.get<MatchShooterCategoriesService>(MatchShooterCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
