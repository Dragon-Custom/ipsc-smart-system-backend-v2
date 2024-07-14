import { Controller } from "@nestjs/common";
import { MatchClassificationsService } from "./match-classifications.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { mixinCrudConfig } from "src/utils";
import {
	CreateMatchClassificationDto,
	MatchClassificationDto,
	UpdateMatchClassificationDto,
} from "./match-classifications.dto";
import { MatchClassification } from "src/entities";

@Controller()
@ApiTags("Match Classifications")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchClassificationDto,
		},
		dto: {
			create: CreateMatchClassificationDto,
			replace: CreateMatchClassificationDto,
			update: UpdateMatchClassificationDto,
		},
	}),
)
export class MatchClassificationsController
	implements CrudController<MatchClassification>
{
	constructor(public readonly service: MatchClassificationsService) {}
}
