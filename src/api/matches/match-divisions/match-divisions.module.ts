import { Module } from "@nestjs/common";
import { MatchDivisionsService } from "./match-divisions.service";
import { MatchDivisionsController } from "./match-divisions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchDivision } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([MatchDivision])],
	controllers: [MatchDivisionsController],
	providers: [MatchDivisionsService],
})
export class MatchDivisionsModule {}
