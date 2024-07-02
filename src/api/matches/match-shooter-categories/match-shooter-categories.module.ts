import { Module } from "@nestjs/common";
import { MatchShooterCategoriesService } from "./match-shooter-categories.service";
import { MatchShooterCategoriesController } from "./match-shooter-categories.controller";

@Module({
	controllers: [MatchShooterCategoriesController],
	providers: [MatchShooterCategoriesService],
})
export class MatchShooterCategoriesModule {}
