import { Module } from "@nestjs/common";
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
import { APP_GUARD, RouterModule, Routes } from "@nestjs/core";
import { ConvertToMatchIdGuard } from "./convertToMatchId.guard";

const routes: Routes = [
	{
		path: "/match",
		module: WhyThereAreTowSameModule_IDK,
	},
	{
		path: "/matches",
		children: [
			{
				path: "/scores",
				children: [ScoresModule],
			},
			{
				path: "/match-classifications",
				children: [MatchClassificationsModule],
			},
			{
				path: "/match-divisions",
				children: [MatchDivisionsModule],
			},
			{
				path: "/dq-reasons",
				children: [DqReasonsModule],
			},
			{
				path: "/match-shooter-categories",
				children: [MatchShooterCategoriesModule],
			},
			{
				path: "/match-staffs",
				children: [MatchStaffsModule],
			},
			{
				path: "/match-stages",
				children: [MatchStagesModule],
			},
			{
				path: "/procedural-penalties",
				children: [ProceduralPenaltiesModule],
			},
			{
				path: "/score-procedural-penalties",
				children: [ScoreProceduralPenaltiesModule],
			},
		],
	},
];

@Module({
	providers: [
		{
			provide: APP_GUARD,
			useClass: ConvertToMatchIdGuard,
		},
	],
	imports: [
		RouterModule.register(routes),
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
