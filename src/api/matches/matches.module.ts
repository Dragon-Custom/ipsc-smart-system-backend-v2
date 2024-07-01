import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MatchShootersModule } from './match-shooters/match-shooters.module';
import { ClassificationsModule } from './classifications/classifications.module';
import { DivisionsModule } from './divisions/divisions.module';
import { DqReasonsModule } from './dq-reasons/dq-reasons.module';
import { MatchShooterCategoriesModule } from './match-shooter-categories/match-shooter-categories.module';
import { MatchStaffsModule } from './match-staffs/match-staffs.module';
import { MatchStagesModule } from './match-stages/match-stages.module';
import { ProceduralPenaltiesModule } from './procedural-penalties/procedural-penalties.module';
import { ScoresModule } from './scores/scores.module';
import { ScoreProceduralPenaltiesModule } from './score-procedural-penalties/score-procedural-penalties.module';
import { StageDqShootersModule } from './stage-dq-shooters/stage-dq-shooters.module';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService],
  imports: [MatchShootersModule, ClassificationsModule, DivisionsModule, DqReasonsModule, MatchShooterCategoriesModule, MatchStaffsModule, MatchStagesModule, ProceduralPenaltiesModule, ScoresModule, ScoreProceduralPenaltiesModule, StageDqShootersModule],
})
export class MatchesModule {}
