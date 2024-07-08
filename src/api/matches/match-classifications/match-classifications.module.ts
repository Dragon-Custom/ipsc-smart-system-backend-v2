import { Module } from "@nestjs/common";
import { MatchClassificationsService } from "./match-classifications.service";
import { MatchClassificationsController } from "./match-classifications.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchClassification } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([MatchClassification])],
	controllers: [MatchClassificationsController],
	providers: [MatchClassificationsService],
})
export class MatchClassificationsModule {}
