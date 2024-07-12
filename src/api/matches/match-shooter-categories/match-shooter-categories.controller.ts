import { Controller } from "@nestjs/common";
import { MatchShooterCategoriesService } from "./match-shooter-categories.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { MatchShooterCategory } from "src/entities";
import { mixinCrudConfig } from "src/types/mixinGlobalCRUDConfig";
import {
	CreateMatchShooterCategoryDto,
	MatchShooterCategoryDto,
	UpdateMatchShooterCategoryDto,
} from "./match-shooter-categories.dto";

@Controller("match-shooter-categories")
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
	}),
)
export class MatchShooterCategoriesController
	implements CrudController<MatchShooterCategory>
{
	constructor(public readonly service: MatchShooterCategoriesService) {}
}
