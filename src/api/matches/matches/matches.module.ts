import { Module } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { MatchesController } from "./matches.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match } from "src/entities";

@Module({
	controllers: [MatchesController],
	providers: [MatchesService],
	imports: [TypeOrmModule.forFeature([Match])],
})
export class MatchesModule {}
