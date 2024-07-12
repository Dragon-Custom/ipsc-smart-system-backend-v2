import { Module } from "@nestjs/common";
import { TeamsService } from "./team.service";
import { TeamsController } from "./team.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "src/entities";
import { UsersModule } from "../users/users.module";

@Module({
	imports: [TypeOrmModule.forFeature([Team]), UsersModule],
	controllers: [TeamsController],
	providers: [TeamsService],
})
export class TeamsModule {}
