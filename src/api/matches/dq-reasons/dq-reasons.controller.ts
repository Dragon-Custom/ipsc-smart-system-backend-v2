import { Controller } from "@nestjs/common";
import { DqReasonsService } from "./dq-reasons.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { DQReason } from "src/entities";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import {
	CreateDqReasonDto,
	DqReasonDto,
	UpdateDqReasonDto,
} from "./dq-reasons.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/api/auth/auth.guard";

//TODO: needs to refactor to enable permission based access control
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
		routes: CreateRouteGroup([
			{
				route: [
					...RouteOperationPreset.C,
					...RouteOperationPreset.U,
					...RouteOperationPreset.D,
				],
				guard: [AuthGuard],
			},
		]),
	}),
)
export class DqReasonsController implements CrudController<DQReason> {
	constructor(public readonly service: DqReasonsService) {}
}
