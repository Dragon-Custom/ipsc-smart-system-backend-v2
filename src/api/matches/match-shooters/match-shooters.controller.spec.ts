import { Test, TestingModule } from '@nestjs/testing';
import { MatchShootersController } from './match-shooters.controller';
import { MatchShootersService } from './match-shooters.service';

describe('MatchShootersController', () => {
  let controller: MatchShootersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchShootersController],
      providers: [MatchShootersService],
    }).compile();

    controller = module.get<MatchShootersController>(MatchShootersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
