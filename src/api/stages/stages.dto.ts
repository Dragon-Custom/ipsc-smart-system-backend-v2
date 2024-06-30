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
	IsOptional,
	IsString,
	IsUUID,
	Max,
	Min,
} from "class-validator";
import { Stage, StageType } from "src/entities";

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
		description: "The thumbnail id of the stage",
		example: "6efb2e6b-e6c2-45c5-97f1-9ebd95a287bc",
	})
	@IsUUID("4")
	thumbnailId: string;

	@ApiPropertyOptional({
		description:
			"The attachment ids of the stage, use the stages/:id/attachments to add or remove attachments",
		example: [
			"6efb2e6b-e6c2-45c5-97f1-9ebd95a287bc",
			"6efb2e6b-e6c2-45c5-97f1-9ebd95a287bc",
		],
	})
	@IsOptional()
	@IsArray()
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
	"thumbnailId",
	"description",
	"briefing",
	"designerId",
	"papers",
	"noShoots",
	"poppers",
	"condidtion",
	"walkthroughTime",
	"isBZoneEnabled",
] as const) {}

export class UpdateStageDto extends PartialType(CreateStageDto) {}
