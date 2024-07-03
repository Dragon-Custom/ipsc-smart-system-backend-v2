import { Module } from "@nestjs/common";
import { TeamsService } from "./team.service";
import { TeamsController } from "./team.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([Team])],
	controllers: [TeamsController],
	providers: [TeamsService],
})
export class TeamsModule {}
