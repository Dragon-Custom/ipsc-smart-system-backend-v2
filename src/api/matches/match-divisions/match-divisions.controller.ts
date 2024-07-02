import { Controller } from "@nestjs/common";
import { MatchDivisionsService } from "./match-divisions.service";

@Controller("match-divisions")
export class MatchDivisionsController {
	constructor(
		private readonly matchDivisionsService: MatchDivisionsService,
	) {}
}
