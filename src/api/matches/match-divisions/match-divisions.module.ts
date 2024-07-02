import { Module } from "@nestjs/common";
import { MatchDivisionsService } from "./match-divisions.service";
import { MatchDivisionsController } from "./match-divisions.controller";

@Module({
	controllers: [MatchDivisionsController],
	providers: [MatchDivisionsService],
})
export class MatchDivisionsModule {}
