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
	IsDateString,
	IsInt,
	IsOptional,
} from "class-validator";
import { Match, MatchStage, Score, Stage } from "src/entities";

export class MatchStageDto extends MatchStage {
	@ApiProperty({
		description: "The id of the match stage",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	//TODO: relations
	scores?: Score[];

	@ApiPropertyOptional({
		description: "The ids of the scores in the match stage",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly scoreIds?: number[];

	//TODO: relations
	match: Match;

	@ApiProperty({
		description: "The id of the match",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchId: number;

	//TODO: relations
	stage: Stage;

	@ApiProperty({
		description: "The id of the stage",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly stageId: number;

	@ApiProperty({
		description: "Whether the match stage is finished",
		example: true,
	})
	@IsBoolean()
	isFinished: boolean;

	@ApiProperty({
		description: "The date the match stage was created",
		example: "2022-01-01T00:00:00.000Z",
		readOnly: true,
	})
	@IsDateString()
	readonly createdAt: Date;

	@ApiProperty({
		description: "The date the match stage was last updated",
		example: "2022-01-01T00:00:00.000Z",
		readOnly: true,
	})
	@IsDateString()
	readonly updatedAt: Date;
}

export class CreateMatchStageDto extends PickType(MatchStageDto, [
	"match",
	"stage",
] as const) {}

export class UpdateMatchStageDto extends PartialType(MatchStageDto) {}

export class MatchStageIdDto extends PickType(MatchStageDto, ["id"] as const) {}
