import { Module } from "@nestjs/common";
import { MatchClassificationsService } from "./match-classifications.service";
import { MatchClassificationsController } from "./match-classifications.controller";

@Module({
	controllers: [MatchClassificationsController],
	providers: [MatchClassificationsService],
})
export class MatchClassificationsModule {}
