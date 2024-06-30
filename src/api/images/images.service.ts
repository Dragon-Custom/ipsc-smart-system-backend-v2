import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { join } from "path";
import config from "src/config";
import { Image } from "src/entities";
import { Repository } from "typeorm";
import * as sharp from "sharp";
import { mkdir, rm, writeFile } from "fs/promises";
import { ImageDto } from "./image.dto";

@Injectable()
export class ImagesService {
	constructor(@InjectRepository(Image) private repo: Repository<Image>) {}

	async saveImage(imageFile: Express.Multer.File): Promise<ImageDto> {
		const processedImage = sharp(imageFile.buffer).png();
		const metadata = await processedImage.metadata();
		const buffer = await processedImage.toBuffer();
		const pathName = await new Promise<string>(async (resolve) => {
			const pathName = join(
				config.server.imageService.path,
				imageFile.originalname,
			);
			await mkdir(config.server.imageService.path, {
				recursive: true,
			});
			await writeFile(pathName, buffer);
			resolve(pathName);
		});
		if (!pathName)
			throw new InternalServerErrorException("Error while saving image");
		const imageEntity = this.repo.create();
		imageEntity.path = pathName;
		imageEntity.name = imageFile.originalname;
		imageEntity.height = metadata.height;
		imageEntity.width = metadata.width;
		imageEntity.fileType = imageFile.mimetype;
		imageEntity.size = buffer.byteLength;
		const result = await this.repo.save(imageEntity);
		return result;
	}

	async getImage(id: string) {
		const image = await this.repo.findOneBy({ id });
		if (!image) throw new NotFoundException("Image not found");
		return image;
	}

	async deleteImage(id: string) {
		const image = await this.getImage(id);
		await this.repo.delete({
			id: image.id,
		});
		await rm(image.path);
		return image;
	}
}
