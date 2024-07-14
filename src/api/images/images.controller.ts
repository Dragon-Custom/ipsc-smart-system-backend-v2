import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	Head,
	Param,
	Post,
	Res,
	SerializeOptions,
	StreamableFile,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { ImagesService } from "./images.service";
import { isMimeType } from "class-validator";
import config from "src/config";
import { ImageDto } from "./image.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { createReadStream } from "fs";
import { plainToInstance } from "class-transformer";
import { AuthGuard } from "../auth/auth.guard";

@Controller("images")
@ApiTags("images")
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Post("")
	@ApiQuery({
		description: "update load an image",
	})
	@ApiOkResponse({ type: ImageDto })
	@SerializeOptions({
		excludeExtraneousValues: false,
	})
	@UseInterceptors(FileInterceptor("file"))
	@UseGuards(AuthGuard)
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
	): Promise<ImageDto> {
		if (!isMimeType(file.mimetype))
			throw new BadRequestException("Invalid file type");
		if (file.size >= config.server.imageService.imageMaxBytes)
			throw new BadRequestException("File size exceeds limit");
		if (!file.mimetype.startsWith("image/"))
			throw new BadRequestException("Invalid file type");
		return await this.imagesService.saveImage(file);
	}

	@Head(":id")
	async getImageHead(
		@Param("id") id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<void> {
		const image = await this.imagesService.getImage(id);
		res.set({
			"Content-Type": image.fileType,
			"Content-Disposition": `attachment; filename="${image.fileName}"`,
			"Content-Length": image.size,
		});
		return;
	}

	@Get(":id")
	async getImage(
		@Param("id") id: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const image = await this.imagesService.getImage(id);
		const file = createReadStream(image.path);
		res.set({
			"Content-Type": image.fileType,
			"Content-Disposition": `attachment; filename="${image.fileName}"`,
			"Content-Length": image.size,
		});
		return new StreamableFile(file);
	}

	@Delete(":id")
	@ApiOkResponse({ type: ImageDto })
	@SerializeOptions({
		excludeExtraneousValues: false,
	})
	@UseGuards(AuthGuard)
	async deleteImage(@Param("id") id: string): Promise<ImageDto> {
		const result = await this.imagesService.deleteImage(id);
		return plainToInstance(ImageDto, result);
	}
}
