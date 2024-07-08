import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { DQReason, Score } from "src/entities";
import { Type } from "class-transformer";
import {
	IsArray,
	IsInt,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";
import { ScoreIdDto } from "../scores/scores.dto";

export class DqReasonDto extends DQReason {
	@ApiProperty({
		description: "Id of the dq reason",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Name of the dq reason",
		example: "No Shooting",
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: "Content of the dq reason",
		example: "The shooter did not shoot any paper",
	})
	@IsString()
	content: string;

	@ApiProperty({
		description: "Index of the dq reason",
		example: "1",
	})
	@IsString()
	index: string;

	dqedScores?: Score[];

	@ApiPropertyOptional({
		description: "the score that dqd with this reason",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly dqedScoresIds?: number[];

	@ApiProperty({
		description: "the count of score that dqd with this reason",
		example: 3,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly dqedScoresCount: number;
}

export class CreateDqReasonDto extends PickType(DqReasonDto, [
	"name",
	"content",
	"index",
	"dqedScores",
] as const) {
	@ApiPropertyOptional({
		description: "the score that dqd with this reason",
		type: () => [ScoreIdDto],
	})
	@IsOptional()
	@ValidateNested()
	@IsArray()
	@IsObject({ each: true })
	@Type(() => ScoreIdDto)
	dqedScores?: Score[];
}

export class UpdateDqReasonDto extends PartialType(CreateDqReasonDto) {}

export class DqReasonIdDto extends PickType(DqReasonDto, ["id"] as const) {}
