import { Module } from '@nestjs/common';
import { ScoreProceduralPenaltiesService } from './score-procedural-penalties.service';
import { ScoreProceduralPenaltiesController } from './score-procedural-penalties.controller';

@Module({
  controllers: [ScoreProceduralPenaltiesController],
  providers: [ScoreProceduralPenaltiesService],
})
export class ScoreProceduralPenaltiesModule {}
