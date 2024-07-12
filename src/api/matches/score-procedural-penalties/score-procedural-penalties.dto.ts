import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsObject, ValidateNested } from "class-validator";
import { ProceduralPenalty, Score, ScoreProceduralPenalty } from "src/entities";
import { ProceduralPenaltyIdDto } from "../procedural-penalties/procedural-penalties.dto";
import { ScoreIdDto } from "../scores/scores.dto";

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

	score: Score;

	@ApiProperty({
		description: "The id of the score record",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly scoreId: number;

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
) {
	@ApiProperty({
		description: "procedural penalty item",
		type: () => ProceduralPenaltyIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => ProceduralPenaltyIdDto)
	proceduralPenalty: ProceduralPenalty;

	@ApiProperty({
		description: "score item",
		type: () => ScoreIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => ScoreIdDto)
	score: Score;
}

export class UpdateScoreProceduralPenaltyDto extends PartialType(
	CreateScoreProceduralPenaltyDto,
) {}

export class ScoreProceduralPenaltiesIdDto extends PickType(
	ScoreProceduralPenaltiesDto,
	["id"] as const,
) {}
