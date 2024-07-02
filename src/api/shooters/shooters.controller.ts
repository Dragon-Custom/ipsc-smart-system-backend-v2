import { Controller } from "@nestjs/common";
import { ShootersService } from "./shooters.service";

@Controller("shooters")
export class ShootersController {
	constructor(private readonly shootersService: ShootersService) {}
}
