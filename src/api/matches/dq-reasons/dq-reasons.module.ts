import { Module } from '@nestjs/common';
import { DqReasonsService } from './dq-reasons.service';
import { DqReasonsController } from './dq-reasons.controller';

@Module({
  controllers: [DqReasonsController],
  providers: [DqReasonsService],
})
export class DqReasonsModule {}
