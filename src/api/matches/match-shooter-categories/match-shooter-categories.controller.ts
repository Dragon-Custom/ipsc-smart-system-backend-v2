import { Controller } from "@nestjs/common";
import { MatchShooterCategoriesService } from "./match-shooter-categories.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { MatchShooterCategory } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { mixinCrudConfig } from "src/types";
import {
	CreateMatchShooterCategoryDto,
	UpdateMatchShooterCategoryDto,
} from "./match-shooter-categories.dto";

@Controller("matches/match-shooter-categories")
@ApiTags("Match Shooter Categories")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchShooterCategory,
		},
		dto: {
			create: CreateMatchShooterCategoryDto,
			update: UpdateMatchShooterCategoryDto,
			replace: CreateMatchShooterCategoryDto,
		},
	}),
)
export class MatchShooterCategoriesController
	implements CrudController<MatchShooterCategory>
{
	constructor(public service: MatchShooterCategoriesService) {}
}
