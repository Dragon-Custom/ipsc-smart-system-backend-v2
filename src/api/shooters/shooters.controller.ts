import { Controller } from "@nestjs/common";
import { ShootersService } from "./shooters.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Shooter } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { CreateShooterDto, ShooterDto, UpdateShooterDto } from "./shooter.dto";
import { mixinCrudConfig } from "src/types";

@Controller("shooters")
@ApiTags("shooters")
@Crud(
	mixinCrudConfig({
		model: {
			type: ShooterDto,
		},
		dto: {
			create: CreateShooterDto,
			update: UpdateShooterDto,
			replace: CreateShooterDto,
		},
	}),
)
export class ShootersController implements CrudController<Shooter> {
	constructor(public service: ShootersService) {}
}
