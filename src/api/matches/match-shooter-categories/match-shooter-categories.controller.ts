import { Controller } from "@nestjs/common";
import { MatchShooterCategoriesService } from "./match-shooter-categories.service";

@Controller("match-shooter-categories")
export class MatchShooterCategoriesController {
	constructor(
		private readonly matchShooterCategoriesService: MatchShooterCategoriesService,
	) {}
}
