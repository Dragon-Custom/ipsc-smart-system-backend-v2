import { Module } from "@nestjs/common";
import { MatchShooterCategoriesService } from "./match-shooter-categories.service";
import { MatchShooterCategoriesController } from "./match-shooter-categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchShooterCategory } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([MatchShooterCategory])],
	controllers: [MatchShooterCategoriesController],
	providers: [MatchShooterCategoriesService],
})
export class MatchShooterCategoriesModule {}
