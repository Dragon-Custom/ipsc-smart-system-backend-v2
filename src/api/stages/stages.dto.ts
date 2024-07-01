import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import {
	IsArray,
	IsBoolean,
	IsDate,
	IsEnum,
	IsInt,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	IsUUID,
	Max,
	Min,
	ValidateNested,
} from "class-validator";
import { Image, Stage, StageType, User } from "src/entities";
import { ImageIdDto } from "../images/image.dto";
import { UserIdDto } from "../users/user.dto";

export class StagesDto extends Stage {
	@ApiProperty({
		description: "The unique identifier of the stage",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "The name of the stage",
		example: "Stage 1",
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: "The thumbnail of the stage",
		example: { id: "6efb2e6b-e6c2-45c5-97f1-9ebd95a287bc" },
	})
	@ValidateNested()
	@Type(() => ImageIdDto)
	thumbnail: Image;

	@ApiProperty({
		description: "The thumbnail id of the stage",
		example: "6efb2e6b-e6c2-45c5-97f1-9ebd95a287bc",
	})
	@IsUUID("4")
	thumbnailId: string;

	@ApiProperty({
		description: "The attachments of the stage",
		example: [{ id: "6efb2e6b-e6c2-45c5-97f1-9ebd95a287bc" }],
	})
	@Type(() => ImageIdDto)
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	attachments: Image[];

	@ApiProperty({
		description: "The attachments ids of the stage",
		example: ["6efb2e6b-e6c2-45c5-97f1-9ebd95a287bc"],
	})
	@IsArray()
	@IsUUID("4", { each: true })
	attachmentIds: string[];

	@ApiPropertyOptional({
		description: "The description of the stage",
		example: "This is the first stage of the project",
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({
		description: "The briefing of the stage",
		example: "This is the briefing of the first stage of the project",
	})
	@IsOptional()
	@IsString()
	briefing?: string;

	@ApiProperty({
		description: "The designer of the stage",
		example: { id: 1 },
	})
	@Type(() => UserIdDto)
	@IsObject()
	@ValidateNested()
	designer: User;

	@ApiProperty({
		description: "The designer's user id of the stage",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	designerId: number;

	@ApiProperty({
		description: "How many papers are in the stage",
		example: 10,
	})
	@Type(() => Number)
	@IsInt()
	papers: number;

	@ApiProperty({
		description: "How many no-shoots are in the stage",
		example: 5,
	})
	@Type(() => Number)
	@IsInt()
	noShoots: number;

	@ApiProperty({
		description: "How many poppers are in the stage",
		example: 3,
	})
	@Type(() => Number)
	@IsInt()
	poppers: number;

	@ApiProperty({
		description: "The condition of the stage",
		example: 1,
		minimum: 1,
		maximum: 3,
	})
	@Type(() => Number)
	@IsInt()
	@Max(3)
	@Min(1)
	condidtion: number;

	@ApiProperty({
		description: "The walkthrough time of the stage in seconds",
		example: 60 * 2, // 2 minutes
	})
	@Type(() => Number)
	@IsNumber()
	walkthroughTime: number;

	@ApiProperty({
		description: "Is the target have the b zone of the stage",
		example: true,
	})
	@Type(() => Boolean)
	@IsBoolean()
	isBZoneEnabled: boolean;

	@ApiProperty({
		description: "Min rounds required to complete the stage",
		readOnly: true,
		example: 10,
	})
	@Type(() => Number)
	@IsInt()
	readonly minRounds: number;

	@ApiProperty({
		description: "Max scores of the stage",
		readOnly: true,
		example: 20,
	})
	@Type(() => Number)
	@IsInt()
	readonly maxScores: number;

	@ApiProperty({
		description: "The type of the stage",
		readOnly: true,
	})
	@IsEnum(StageType)
	readonly stageType: StageType;

	@ApiProperty({
		description: "The create date of the stage",
		example: new Date(),
		readOnly: true,
	})
	@IsDate()
	readonly createdAt: Date;

	@ApiProperty({
		description: "The update date of the stage",
		example: new Date(),
		readOnly: true,
	})
	@IsDate()
	readonly updatedAt: Date;

	@Exclude()
	readonly deletedAt: Date;
}

export class CreateStageDto extends PickType(StagesDto, [
	"name",
	"thumbnail",
	"attachments",
	"description",
	"briefing",
	"designer",
	"papers",
	"noShoots",
	"poppers",
	"condidtion",
	"walkthroughTime",
	"isBZoneEnabled",
] as const) {}

export class UpdateStageDto extends PartialType(CreateStageDto) {}

export class StageIdDto extends PickType(StagesDto, ["id"] as const) {}
