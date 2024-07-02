import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { ProceduralPenalty, ScoreProceduralPenalty } from "src/entities";

export class ProceduralPenaltyDto extends ProceduralPenalty {
	@ApiProperty({
		description: "The id of the procedural penalty",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "The name of the procedural penalty",
		example: "Penalty 1",
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: "The content of the procedural penalty",
		example: "This is the content of the first penalty",
	})
	@IsString()
	content: string;

	@ApiProperty({
		description: "The index of the procedural penalty",
		example: "1",
	})
	@IsString()
	index: string;

	//TODO: relations
	proceduralPenaltyOfScores?: ScoreProceduralPenalty[];

	@ApiPropertyOptional({
		description: "The ids of the score-procedural-penalties",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly scoreProceduralPenaltyIds?: number[];
}

export class CreateProceduralPenaltyDto extends PickType(ProceduralPenaltyDto, [
	"name",
	"content",
	"index",
]) {}

export class UpdateProceduralPenaltyDto extends PartialType(
	ProceduralPenaltyDto,
) {}

export class ProceduralPenaltyIdDto extends PickType(ProceduralPenaltyDto, [
	"id",
]) {}
