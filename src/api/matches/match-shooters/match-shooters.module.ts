import { Module } from "@nestjs/common";
import { MatchShootersService } from "./match-shooters.service";
import { MatchShootersController } from "./match-shooters.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match, MatchShooter, MatchStaff } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([MatchShooter, Match, MatchStaff])],
	controllers: [MatchShootersController],
	providers: [MatchShootersService],
})
export class MatchShootersModule {}
