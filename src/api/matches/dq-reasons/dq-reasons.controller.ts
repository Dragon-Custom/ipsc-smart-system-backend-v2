import { Controller } from "@nestjs/common";
import { DqReasonsService } from "./dq-reasons.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { DQReason } from "src/entities";
import { mixinCrudConfig } from "src/utils";
import {
	CreateDqReasonDto,
	DqReasonDto,
	UpdateDqReasonDto,
} from "./dq-reasons.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("DQ Reasons")
@Crud(
	mixinCrudConfig({
		model: {
			type: DqReasonDto,
		},
		dto: {
			create: CreateDqReasonDto,
			update: UpdateDqReasonDto,
			replace: CreateDqReasonDto,
		},
	}),
)
export class DqReasonsController implements CrudController<DQReason> {
	constructor(public readonly service: DqReasonsService) {}
}
