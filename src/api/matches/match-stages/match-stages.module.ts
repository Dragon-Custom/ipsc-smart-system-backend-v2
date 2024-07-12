import { Module } from "@nestjs/common";
import { MatchStagesService } from "./match-stages.service";
import { MatchStagesController } from "./match-stages.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchStage } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([MatchStage])],
	controllers: [MatchStagesController],
	providers: [MatchStagesService],
})
export class MatchStagesModule {}
