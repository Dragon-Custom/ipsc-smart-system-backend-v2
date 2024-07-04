import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { mkdir, rm, writeFile } from "fs/promises";
import { join } from "path";
import * as sharp from "sharp";
import config from "src/config";
import { Image } from "src/entities/image.entity";
import { Repository } from "typeorm";
import { ImageDto } from "./image.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ImagesService {
	constructor(@InjectRepository(Image) private repo: Repository<Image>) {}

	async saveImage(imageFile: Express.Multer.File): Promise<ImageDto> {
		const processedImage = sharp(imageFile.buffer).png();
		const metadata = await processedImage.metadata();
		const buffer = await processedImage.toBuffer();
		const pathName = await new Promise<string>(async (resolve) => {
			const pathName = join(
				config.server.imageService.imageStoragePath,
				imageFile.originalname,
			);
			await mkdir(config.server.imageService.imageStoragePath, {
				recursive: true,
			});
			await writeFile(pathName, buffer);
			resolve(pathName);
		});
		if (!pathName)
			throw new InternalServerErrorException("Error while saving image");
		const imageEntity = this.repo.create();
		imageEntity.path = pathName;
		imageEntity.fileName = imageFile.originalname;
		imageEntity.height = metadata.height;
		imageEntity.width = metadata.width;
		imageEntity.fileType = imageFile.mimetype;
		imageEntity.size = buffer.byteLength;
		const result = await this.repo.save(imageEntity);
		return plainToInstance(ImageDto, result);
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
