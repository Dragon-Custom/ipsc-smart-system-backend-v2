import { Test, TestingModule } from '@nestjs/testing';
import { StageDqShootersService } from './stage-dq-shooters.service';

describe('StageDqShootersService', () => {
  let service: StageDqShootersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StageDqShootersService],
    }).compile();

    service = module.get<StageDqShootersService>(StageDqShootersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
