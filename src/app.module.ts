import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./config";
import { DataSource } from "typeorm";
import {
	Match,
	Shooter,
	Stage,
	Team,
	User,
	MatchShooter,
	MatchStaff,
	MatchDivision,
	MatchClassification,
	MatchShooterCategory,
	MatchStage,
	Score,
	ProceduralPenalty,
	ScoreProceduralPenalty,
	DQReason,
} from "./entities";
import { UsersModule } from "./api/users/users.module";
import { ShootersModule } from "./api/shooters/shooters.module";
import { StagesModule } from "./api/stages/stages.module";
import { TeamsModule } from "./api/teams/team.module";
import { MatchesModule } from "./api/matches/matches.module";
import { ImagesModule } from "./api/images/images.module";
import { Image } from "./entities/image.entity";
import { AuthModule } from "./api/auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: config.database.host,
			port: config.database.port,
			username: config.database.username,
			password: config.database.password,
			database: config.database.database,
			logging: ["error", "warn", "info", "query", "schema", "migration"],
			entities: [
				User,
				Shooter,
				Team,
				Stage,
				Match,
				MatchStaff,
				MatchShooter,
				MatchStage,
				MatchDivision,
				MatchClassification,
				MatchShooterCategory,
				ProceduralPenalty,
				ScoreProceduralPenalty,
				Score,
				DQReason,
				Image,
			],
			synchronize: process.env.NODE_ENV !== "production",
		}),
		UsersModule,
		ShootersModule,
		StagesModule,
		TeamsModule,
		MatchesModule,
		ImagesModule,
		AuthModule,
	],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
