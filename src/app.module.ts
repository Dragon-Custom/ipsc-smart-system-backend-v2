import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
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
	Division,
	Classification,
	MatchShooterCategory,
	MatchStage,
	Score,
	ProceduralPenalty,
	ScoreProceduralPenalty,
	DQReason,
	StageDQShooter,
} from "./entities";

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
				Division,
				Classification,
				MatchShooterCategory,
				ProceduralPenalty,
				ScoreProceduralPenalty,
				Score,
				DQReason,
				StageDQShooter,
			],
			synchronize: process.env.NODE_ENV !== "production",
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
