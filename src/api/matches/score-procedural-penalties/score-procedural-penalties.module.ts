import { Module } from "@nestjs/common";
import { ScoreProceduralPenaltiesService } from "./score-procedural-penalties.service";
import { ScoreProceduralPenaltiesController } from "./score-procedural-penalties.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchStaff, ScoreProceduralPenalty } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([ScoreProceduralPenalty, MatchStaff])],
	controllers: [ScoreProceduralPenaltiesController],
	providers: [ScoreProceduralPenaltiesService],
})
export class ScoreProceduralPenaltiesModule {}
