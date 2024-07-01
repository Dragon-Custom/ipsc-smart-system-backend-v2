import { Test, TestingModule } from '@nestjs/testing';
import { MatchStaffsController } from './match-staffs.controller';
import { MatchStaffsService } from './match-staffs.service';

describe('MatchStaffsController', () => {
  let controller: MatchStaffsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchStaffsController],
      providers: [MatchStaffsService],
    }).compile();

    controller = module.get<MatchStaffsController>(MatchStaffsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
