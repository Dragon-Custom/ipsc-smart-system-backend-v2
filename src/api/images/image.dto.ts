import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
	IsDate,
	IsMimeType,
	IsNumber,
	IsString,
	IsUUID,
} from "class-validator";
import { Image } from "src/entities/image.entity";

export class ImageDto extends Image {
	@ApiProperty({
		description: "Image UUID",
	})
	@IsUUID("4")
	id: string;

	@ApiProperty({
		description: "Image name",
	})
	@IsString()
	fileName: string;

	@Exclude()
	path: string;

	@ApiProperty({
		description: "Image height",
	})
	@IsNumber()
	height: number;

	@ApiProperty({
		description: "Image width",
	})
	@IsNumber()
	width: number;

	@ApiProperty({
		description: "Image size in bytes",
	})
	@IsNumber()
	size: number;

	@ApiProperty({
		description: "Image file type",
	})
	@IsMimeType()
	fileType: string;

	@ApiProperty({
		description: "Image creation date",
	})
	@IsDate()
	createdAt: Date;
}
