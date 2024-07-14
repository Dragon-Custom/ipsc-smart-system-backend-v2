import { Module } from "@nestjs/common";
import { MatchClassificationsService } from "./match-classifications.service";
import { MatchClassificationsController } from "./match-classifications.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match, MatchClassification, MatchStaff } from "src/entities";

@Module({
	imports: [
		TypeOrmModule.forFeature([MatchClassification, Match, MatchStaff]),
	],
	controllers: [MatchClassificationsController],
	providers: [MatchClassificationsService],
})
export class MatchClassificationsModule {}
