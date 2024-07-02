import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { DQReason, Score } from "src/entities";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsString } from "class-validator";

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

	//TODO: relation
	dqedScores: Score[];

	@ApiProperty({
		description: "the score that dqd with this reason",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly dqedScoresIds: number[];
}

export class DqReasonCreateDto extends PickType(DqReasonDto, [
	"name",
	"content",
	"index",
] as const) {}

export class DqReasonUpdateDto extends PartialType(DqReasonCreateDto) {}

export class DqReasonIdDto extends PickType(DqReasonDto, ["id"] as const) {}
