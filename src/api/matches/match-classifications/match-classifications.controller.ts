import { Controller } from "@nestjs/common";
import { MatchClassificationsService } from "./match-classifications.service";

@Controller("match-classifications")
export class MatchClassificationsController {
	constructor(
		private readonly matchClassificationsService: MatchClassificationsService,
	) {}
}
