import { Test, TestingModule } from '@nestjs/testing';
import { StageDqShootersController } from './stage-dq-shooters.controller';
import { StageDqShootersService } from './stage-dq-shooters.service';

describe('StageDqShootersController', () => {
  let controller: StageDqShootersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StageDqShootersController],
      providers: [StageDqShootersService],
    }).compile();

    controller = module.get<StageDqShootersController>(StageDqShootersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
