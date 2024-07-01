import { Test, TestingModule } from '@nestjs/testing';
import { DqReasonsController } from './dq-reasons.controller';
import { DqReasonsService } from './dq-reasons.service';

describe('DqReasonsController', () => {
  let controller: DqReasonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DqReasonsController],
      providers: [DqReasonsService],
    }).compile();

    controller = module.get<DqReasonsController>(DqReasonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
