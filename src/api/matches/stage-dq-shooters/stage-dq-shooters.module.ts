import { Module } from '@nestjs/common';
import { StageDqShootersService } from './stage-dq-shooters.service';
import { StageDqShootersController } from './stage-dq-shooters.controller';

@Module({
  controllers: [StageDqShootersController],
  providers: [StageDqShootersService],
})
export class StageDqShootersModule {}
