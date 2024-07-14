import { Controller } from "@nestjs/common";
import { MatchClassificationsService } from "./match-classifications.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import {
	CreateMatchClassificationDto,
	MatchClassificationDto,
	UpdateMatchClassificationDto,
} from "./match-classifications.dto";
import { MatchClassification, MatchShooterCategory } from "src/entities";
import { OriginalTargetEntity } from "../convertToMatchId.guard";
import { IsMatchStaffOrOrganizerGuard } from "../match-staffs/match-staffs.guard";
import { AuthGuard } from "src/api/auth/auth.guard";

@Controller()
@ApiTags("Match Classifications")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchClassificationDto,
		},
		dto: {
			create: CreateMatchClassificationDto,
			replace: CreateMatchClassificationDto,
			update: UpdateMatchClassificationDto,
		},
		routes: CreateRouteGroup([
			{
				route: [
					...RouteOperationPreset.C,
					...RouteOperationPreset.U,
					...RouteOperationPreset.D,
				],
				options: {
					decorators: [OriginalTargetEntity(MatchShooterCategory)],
				},
				guard: [AuthGuard, IsMatchStaffOrOrganizerGuard],
			},
		]),
	}),
)
export class MatchClassificationsController
	implements CrudController<MatchClassification>
{
	constructor(public readonly service: MatchClassificationsService) {}
}
