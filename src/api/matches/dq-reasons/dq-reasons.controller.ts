import { Controller } from "@nestjs/common";
import { DqReasonsService } from "./dq-reasons.service";

@Controller("dq-reasons")
export class DqReasonsController {
	constructor(private readonly dqReasonsService: DqReasonsService) {}
}
