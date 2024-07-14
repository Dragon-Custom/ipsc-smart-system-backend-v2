import { Module } from "@nestjs/common";
import { ScoresService } from "./scores.service";
import { ScoresController } from "./scores.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchStaff, Score } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([Score, MatchStaff])],
	controllers: [ScoresController],
	providers: [ScoresService],
})
export class ScoresModule {}
