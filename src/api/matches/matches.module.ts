import { Module } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { MatchesController } from "./matches.controller";
import { MatchShootersModule } from "./match-shooters/match-shooters.module";
import { MatchClassificationsModule } from "./match-classifications/match-classifications.module";
import { MatchDivisionsModule } from "./match-divisions/match-divisions.module";
import { DqReasonsModule } from "./dq-reasons/dq-reasons.module";
import { MatchShooterCategoriesModule } from "./match-shooter-categories/match-shooter-categories.module";
import { MatchStaffsModule } from "./match-staffs/match-staffs.module";
import { MatchStagesModule } from "./match-stages/match-stages.module";
import { ProceduralPenaltiesModule } from "./procedural-penalties/procedural-penalties.module";
import { ScoresModule } from "./scores/scores.module";
import { ScoreProceduralPenaltiesModule } from "./score-procedural-penalties/score-procedural-penalties.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match } from "src/entities";

@Module({
	controllers: [MatchesController],
	providers: [MatchesService],
	imports: [
		TypeOrmModule.forFeature([Match]),
		MatchShootersModule,
		MatchClassificationsModule,
		MatchDivisionsModule,
		DqReasonsModule,
		MatchShooterCategoriesModule,
		MatchStaffsModule,
		MatchStagesModule,
		ProceduralPenaltiesModule,
		ScoresModule,
		ScoreProceduralPenaltiesModule,
	],
})
export class MatchesModule {}
