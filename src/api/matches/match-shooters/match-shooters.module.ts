import { Module } from '@nestjs/common';
import { MatchShootersService } from './match-shooters.service';
import { MatchShootersController } from './match-shooters.controller';

@Module({
  controllers: [MatchShootersController],
  providers: [MatchShootersService],
})
export class MatchShootersModule {}
