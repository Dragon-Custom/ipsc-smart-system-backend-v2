import { Module } from "@nestjs/common";
import { MatchStaffsService } from "./match-staffs.service";
import { MatchStaffsController } from "./match-staffs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match, MatchStaff } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([MatchStaff, Match])],
	controllers: [MatchStaffsController],
	providers: [MatchStaffsService],
})
export class MatchStaffsModule {}
