import { Controller } from "@nestjs/common";
import { MatchShootersService } from "./match-shooters.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import {
	CreateMatchShooterDto,
	MatchShooterDto,
	UpdateMatchShooterDto,
} from "./match-shooters.dto";
import { MatchShooter } from "src/entities";

@Controller("matches/match-shooters")
@ApiTags("Match Shooters")
@Crud({
	model: {
		type: MatchShooterDto,
	},
	dto: {
		create: CreateMatchShooterDto,
		replace: CreateMatchShooterDto,
		update: UpdateMatchShooterDto,
	},
})
export class MatchShootersController implements CrudController<MatchShooter> {
	constructor(public readonly service: MatchShootersService) {}
}
