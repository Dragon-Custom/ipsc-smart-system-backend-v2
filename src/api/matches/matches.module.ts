import { Module } from "@nestjs/common";
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
import { MatchesModule as WhyThereAreTowSameModule_IDK } from "./matches/matches.module";

@Module({
	imports: [
		MatchesModule,
		WhyThereAreTowSameModule_IDK,
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
