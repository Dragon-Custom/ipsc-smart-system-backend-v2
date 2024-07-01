import { Test, TestingModule } from '@nestjs/testing';
import { MatchShooterCategoriesController } from './match-shooter-categories.controller';
import { MatchShooterCategoriesService } from './match-shooter-categories.service';

describe('MatchShooterCategoriesController', () => {
  let controller: MatchShooterCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchShooterCategoriesController],
      providers: [MatchShooterCategoriesService],
    }).compile();

    controller = module.get<MatchShooterCategoriesController>(MatchShooterCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
