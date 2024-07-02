import { Module } from "@nestjs/common";
import { MatchStagesService } from "./match-stages.service";
import { MatchStagesController } from "./match-stages.controller";

@Module({
	controllers: [MatchStagesController],
	providers: [MatchStagesService],
})
export class MatchStagesModule {}
