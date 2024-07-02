import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import {
	IsArray,
	IsDate,
	IsEnum,
	IsInt,
	IsNumber,
	IsOptional,
} from "class-validator";
import {
	DQReason,
	MatchShooter,
	MatchStage,
	PowerFactor,
	Score,
	ScoreProceduralPenalty,
	ScoreStateType,
} from "src/entities";

export class ScoreDto extends Score {
	@ApiProperty({
		description: "The id of the score",
		example: 1,
		uniqueItems: true,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "The time of the score",
		example: 1.23,
	})
	@IsNumber()
	time: number;

	@ApiProperty({
		description: "Alpha count",
		example: 4,
	})
	@Type(() => Number)
	@IsInt()
	alpha: number;

	@ApiProperty({
		description: "Bravo count",
		example: 2,
	})
	@Type(() => Number)
	@IsInt()
	bravo: number;

	@ApiProperty({
		description: "Charlie count",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	charlie: number;

	@ApiProperty({
		description: "Delta count",
		example: 0,
	})
	@Type(() => Number)
	@IsInt()
	delta: number;

	@ApiProperty({
		description: "Miss count",
		example: 0,
	})
	@Type(() => Number)
	@IsInt()
	miss: number;

	@ApiProperty({
		description: "No shoot count",
		example: 0,
	})
	@Type(() => Number)
	@IsInt()
	noShoot: number;

	@ApiProperty({
		description: "Popper count",
		example: 0,
	})
	@Type(() => Number)
	@IsInt()
	popper: number;

	@ApiProperty({
		description: "The state of the score",
		enum: ScoreStateType,
		example: ScoreStateType.Completed,
	})
	@IsEnum(ScoreStateType)
	state: ScoreStateType;

	//TODO: relation
	scoreProceduralPenalties?: ScoreProceduralPenalty[];

	@ApiPropertyOptional({
		description: "Ids of pro-penalties",
		example: [1, 2, 3],
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	scoreProceduralPenaltiesId: number[];

	@ApiProperty({
		description: "Total pro-penalties",
		example: 10,
	})
	@Type(() => Number)
	@IsInt()
	totalProceduralPenalties: number;

	@ApiProperty({
		description: "The score of the score",
		example: 100,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly score: number;

	@ApiProperty({
		description: "The hit factor of the score",
		example: 1.23,
		readOnly: true,
	})
	@IsNumber()
	readonly hitFactor: number;

	@ApiProperty({
		description: "power factor of this score",
		example: PowerFactor.Major,
		enum: PowerFactor,
	})
	@IsEnum(PowerFactor)
	powerFactor: PowerFactor;

	//TODO: relation
	matchStage: MatchStage;

	@ApiProperty({
		description: "The id of the match stage",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchStageId: number;

	//TODO: relation
	matchShooter: MatchShooter;

	@ApiProperty({
		description: "The id of the match shooter",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchShooterId: number;

	//TODO: relation
	dqReason?: DQReason;

	@ApiPropertyOptional({
		description: "The id of the dq reason",
		example: 1,
		readOnly: true,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	readonly dqReasonId?: number;

	@ApiProperty({
		description: "The creation date of the score",
		example: "2022-01-01T00:00:00.000Z",
		readOnly: true,
	})
	@IsDate()
	readonly createdAt: Date;

	@ApiProperty({
		description: "The update date of this score",
		example: "2022-01-01T00:00:00.000Z",
		readOnly: true,
	})
	@IsDate()
	readonly updatedAt: Date;

	@Exclude()
	deletedAt: Date;

	@ApiProperty({
		description: "What's the version is this score",
		example: 2,
	})
	@Type(() => Number)
	@IsInt()
	iterations: number;
}

export class CreateScoreDto extends PickType(ScoreDto, [
	"alpha",
	"bravo",
	"charlie",
	"delta",
	"miss",
	"noShoot",
	"popper",
	"state",
	"scoreProceduralPenalties",
	"totalProceduralPenalties",
	"powerFactor",
	"matchStage",
	"matchShooter",
	"dqReason",
	"iterations",
] as const) {}

export class UpdateScoreDto extends PartialType(CreateScoreDto) {}

export class ScoreIdDto extends PickType(ScoreDto, ["id"] as const) {}
