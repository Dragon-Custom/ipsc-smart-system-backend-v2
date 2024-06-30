import { Controller } from "@nestjs/common";
import { StagesService } from "./stages.service";
import {
	CreateManyDto,
	Crud,
	CrudController,
	CrudRequest,
	Override,
	ParsedBody,
	ParsedRequest,
} from "@nestjsx/crud";
import { Stage } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { mixinCrudConfig } from "src/types";
import { CreateStageDto, StagesDto, UpdateStageDto } from "./stages.dto";

@Controller("stages")
@ApiTags("stages")
@Crud(
	mixinCrudConfig({
		model: {
			type: StagesDto,
		},
		dto: {
			create: CreateStageDto,
			update: UpdateStageDto,
			replace: CreateStageDto,
		},
	}),
)
export class StagesController implements CrudController<Stage> {
	constructor(public service: StagesService) {}

	get base(): CrudController<Stage> {
		return this;
	}

	@Override()
	async createOne(
		@ParsedRequest() req: CrudRequest,
		@ParsedBody() dto: Stage,
	) {
		const stage = await this.base.createOneBase(req, dto);
		this.service.addAttachmentToStage(stage.id, dto.attachmentIds);
		stage.attachmentIds = dto.attachmentIds;
		return stage;
	}

	@Override()
	async createMany(
		@ParsedRequest() req: CrudRequest,
		@ParsedBody() dto: CreateManyDto<Stage>,
	) {
		const stages = await this.service.createMany(req, dto);
		for (const index in stages) {
			await this.service.addAttachmentToStage(
				stages[index].id,
				dto.bulk[index].attachmentIds,
			);
		}
	}

	@Override()
	async updateOneBase(req: CrudRequest, dto: Stage): Promise<Stage> {
		const stage = await this.base.updateOneBase(req, dto);
		this.service.addAttachmentToStage(stage.id, dto.attachmentIds);
		return stage;
	}

	@Override()
	async replaceOneBase(req: CrudRequest, dto: Stage): Promise<Stage> {
		const stage = await this.base.replaceOneBase(req, dto);
		this.service.addAttachmentToStage(stage.id, dto.attachmentIds);
		return stage;
	}
}
