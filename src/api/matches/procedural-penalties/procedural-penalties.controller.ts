import { Controller } from "@nestjs/common";
import { ProceduralPenaltiesService } from "./procedural-penalties.service";

@Controller("procedural-penalties")
export class ProceduralPenaltiesController {
	constructor(
		private readonly proceduralPenaltiesService: ProceduralPenaltiesService,
	) {}
}
