import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { IsDate, IsInt, IsMimeType, IsString, IsUUID } from "class-validator";
import { Image } from "src/entities";

export class ImageDto extends Image {
	@ApiProperty({
		description: "Image id",
		example: "xxxxxx-xxxx-xxxxxxxxxxxx",
	})
	@IsUUID("4")
	id: string;

	@ApiProperty({
		description: "Image name",
		example: "image1.jpg",
	})
	@IsString()
	name: string;

	@Exclude()
	path: string;

	@ApiProperty({
		description: "Image height",
		example: 100,
	})
	@Type(() => Number)
	@IsInt()
	height: number;

	@ApiProperty({
		description: "Image width",
		example: 100,
	})
	@Type(() => Number)
	@IsInt()
	width: number;

	@ApiProperty({
		description: "Image file type",
		example: "image/jpeg",
	})
	@IsMimeType()
	fileType: string;

	@ApiProperty({
		description: "Image file size in bytes",
		example: 100000,
	})
	@Type(() => Number)
	@IsInt()
	size: number;

	@ApiProperty({
		description: "image upload date",
		example: new Date(),
	})
	@IsDate()
	createdAt: Date;
}
