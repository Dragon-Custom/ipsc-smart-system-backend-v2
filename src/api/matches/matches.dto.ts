import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsArray,
	IsBoolean,
	IsDate,
	IsDateString,
	IsInt,
	IsOptional,
	IsString,
	IsUrl,
	Max,
	Min,
} from "class-validator";
import { Match } from "src/entities";

export class MatchDto extends Match {
	@ApiProperty({
		description: "Match ID",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Match name",
		example: "Match 1",
	})
	@IsString()
	name: string;

	@ApiPropertyOptional({
		description: "Match description",
		example: "This is the first match",
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		description: "Match staff IDs",
		example: [1, 2, 3],
	})
	@IsArray()
	@IsInt({ each: true })
	staffIds: number[];

	@ApiProperty({
		description: "Match shooter IDs",
		example: [1, 2, 3],
	})
	@IsArray()
	@IsInt({ each: true })
	matchShooterIds: number[];

	@ApiProperty({
		description: "Match stage IDs",
		example: [1, 2, 3],
	})
	@IsArray()
	@IsInt({ each: true })
	matchStageIds: number[];

	@ApiProperty({
		description: "Match level",
		example: 1,
	})
	@IsInt()
	@Max(5)
	@Min(1)
	level: number;

	@ApiPropertyOptional({
		description: "Match link",
		example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	})
	@IsOptional()
	@IsUrl()
	link?: string;

	@ApiProperty({
		description: "Match date",
		example: new Date(),
	})
	@IsDateString()
	matchDate: Date;

	@ApiProperty({
		description: "Is the stage DQ enabled for this match?",
		example: true,
	})
	@IsBoolean()
	isStageDQEnabled: boolean;

	@ApiProperty({
		description: "Is the match finished?",
		example: true,
	})
	@IsBoolean()
	isFinished: boolean;

	@ApiProperty({
		description: "Match was created at",
		example: new Date(),
	})
	@IsDate()
	createdAt: Date;
}

export class CreateMatchDto extends PickType(MatchDto, [
	"name",
	"description",
	"staffIds",
	"matchShooterIds",
	"matchStageIds",
	"level",
	"link",
	"matchDate",
	"isStageDQEnabled",
] as const) {}

export class UpdateMatchDto extends PartialType(CreateMatchDto) {}
