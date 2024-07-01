import { Module } from '@nestjs/common';
import { MatchStaffsService } from './match-staffs.service';
import { MatchStaffsController } from './match-staffs.controller';

@Module({
  controllers: [MatchStaffsController],
  providers: [MatchStaffsService],
})
export class MatchStaffsModule {}
