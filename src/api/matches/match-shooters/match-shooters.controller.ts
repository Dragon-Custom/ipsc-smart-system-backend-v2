import { Controller } from "@nestjs/common";
import { MatchShootersService } from "./match-shooters.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import {
	CreateMatchShooterDto,
	MatchShooterDto,
	UpdateMatchShooterDto,
} from "./match-shooters.dto";
import { MatchShooter } from "src/entities";
import { CreateRouteGroup, RouteOperationPreset } from "src/utils";
import { OriginalTargetEntity } from "../convertToMatchId.guard";
import { AuthGuard } from "src/api/auth/auth.guard";
import { IsMatchStaffOrOrganizerGuard } from "../match-staffs/match-staffs.guard";

@Controller()
@ApiTags("Match Shooters")
@Crud({
	model: {
		type: MatchShooterDto,
	},
	dto: {
		create: CreateMatchShooterDto,
		replace: CreateMatchShooterDto,
		update: UpdateMatchShooterDto,
	},
	routes: CreateRouteGroup([
		{
			route: [
				...RouteOperationPreset.C,
				...RouteOperationPreset.U,
				...RouteOperationPreset.D,
			],
			options: {
				decorators: [OriginalTargetEntity(MatchShooter)],
			},
			guard: [AuthGuard, IsMatchStaffOrOrganizerGuard],
		},
	]),
})
export class MatchShootersController implements CrudController<MatchShooter> {
	constructor(public readonly service: MatchShootersService) {}
}
