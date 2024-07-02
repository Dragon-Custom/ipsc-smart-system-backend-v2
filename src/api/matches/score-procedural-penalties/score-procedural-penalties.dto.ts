import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";
import { ProceduralPenalty, Score, ScoreProceduralPenalty } from "src/entities";

export class ScoreProceduralPenaltiesDto extends ScoreProceduralPenalty {
	@ApiProperty({
		description: "The id of the score-procedural-penalty record",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "The count of the score-procedural-penalty record",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	count: number;

	//TODO: relation
	score: Score;

	@ApiProperty({
		description: "The id of the score record",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly scoreId: number;

	//TODO: relation
	proceduralPenalty: ProceduralPenalty;

	@ApiProperty({
		description: "The id of the procedural-penalty record",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly proceduralPenaltyId: number;
}

export class CreateScoreProceduralPenaltyDto extends PickType(
	ScoreProceduralPenaltiesDto,
	["count", "proceduralPenalty", "score"] as const,
) {}

export class UpdateScoreProceduralPenaltyDto extends PartialType(
	CreateScoreProceduralPenaltyDto,
) {}

export class ScoreProceduralPenaltiesIdDto extends PickType(
	ScoreProceduralPenaltiesDto,
	["id"] as const,
) {}
