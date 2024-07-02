import { Controller } from "@nestjs/common";
import { TeamsService } from "./team.service";

@Controller("teams")
export class TeamsController {
	constructor(private readonly teamService: TeamsService) {}
}
