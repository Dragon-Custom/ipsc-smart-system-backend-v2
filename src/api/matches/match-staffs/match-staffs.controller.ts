import { Controller } from "@nestjs/common";
import { MatchStaffsService } from "./match-staffs.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { MatchStaff } from "src/entities";
import { mixinCrudConfig } from "src/utils";
import {
	CreateMatchStaffsDto,
	MatchStaffsDto,
	UpdateMatchStaffsDto,
} from "./match-staffs.dto";

@Controller("matches/match-staffs")
@ApiTags("Match Staffs")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchStaffsDto,
		},
		dto: {
			create: CreateMatchStaffsDto,
			replace: CreateMatchStaffsDto,
			update: UpdateMatchStaffsDto,
		},
	}),
)
export class MatchStaffsController implements CrudController<MatchStaff> {
	constructor(public readonly service: MatchStaffsService) {}
}
