import { Controller } from "@nestjs/common";
import { MatchShooterCategoriesService } from "./match-shooter-categories.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { MatchShooterCategory } from "src/entities";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import {
	CreateMatchShooterCategoryDto,
	MatchShooterCategoryDto,
	UpdateMatchShooterCategoryDto,
} from "./match-shooter-categories.dto";
import { ApiTags } from "@nestjs/swagger";
import { OriginalTargetEntity } from "../convertToMatchId.guard";
import { AuthGuard } from "src/api/auth/auth.guard";
import { IsMatchStaffOrOrganizerGuard } from "../match-staffs/match-staffs.guard";

@Controller()
@ApiTags("Match Shooter Categories")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchShooterCategoryDto,
		},
		dto: {
			create: CreateMatchShooterCategoryDto,
			replace: CreateMatchShooterCategoryDto,
			update: UpdateMatchShooterCategoryDto,
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
export class MatchShooterCategoriesController
	implements CrudController<MatchShooterCategory>
{
	constructor(public readonly service: MatchShooterCategoriesService) {}
}
