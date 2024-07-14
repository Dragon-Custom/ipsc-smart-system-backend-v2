import { Module } from "@nestjs/common";
import { MatchDivisionsService } from "./match-divisions.service";
import { MatchDivisionsController } from "./match-divisions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match, MatchDivision, MatchStaff } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([MatchDivision, Match, MatchStaff])],
	controllers: [MatchDivisionsController],
	providers: [MatchDivisionsService],
})
export class MatchDivisionsModule {}
