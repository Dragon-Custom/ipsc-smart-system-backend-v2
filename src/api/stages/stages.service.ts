import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Image, Stage } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class StagesService extends TypeOrmCrudService<Stage> {
	constructor(@InjectRepository(Stage) public repo: Repository<Stage>) {
		super(repo);
	}

	async addAttachmentToStage(stageId: number, attachmentIds: string[]) {
		for (const attachmentId of attachmentIds) {
			const image = await this.repo.manager.findOneBy(Image, {
				id: attachmentId,
			});
			image.stage = await this.repo.findOneBy({ id: stageId });
			await this.repo.manager.save(image);
		}
		return;
	}
}
