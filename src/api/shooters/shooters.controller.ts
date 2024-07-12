import { Controller } from "@nestjs/common";
import { ShootersService } from "./shooters.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Shooter } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { mixinCrudConfig } from "src/utils";
import { CreateShooterDto, ShooterDto, UpdateShooterDto } from "./shooters.dto";

@Controller("shooters")
@ApiTags("shooters")
@Crud(
	mixinCrudConfig({
		model: {
			type: ShooterDto,
		},
		dto: {
			create: CreateShooterDto,
			replace: CreateShooterDto,
			update: UpdateShooterDto,
		},
		//TODO: auth
	}),
)
export class ShootersController implements CrudController<Shooter> {
	constructor(public readonly service: ShootersService) {}
}
