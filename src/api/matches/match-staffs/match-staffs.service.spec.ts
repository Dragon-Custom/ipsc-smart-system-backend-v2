import { Test, TestingModule } from '@nestjs/testing';
import { MatchStaffsService } from './match-staffs.service';

describe('MatchStaffsService', () => {
  let service: MatchStaffsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchStaffsService],
    }).compile();

    service = module.get<MatchStaffsService>(MatchStaffsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
