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
	IsObject,
	IsOptional,
	ValidateNested,
} from "class-validator";
import {
	DQReason,
	Match,
	MatchShooter,
	MatchStage,
	PowerFactor,
	Score,
	ScoreProceduralPenalty,
	ScoreStateType,
} from "src/entities";
import { ScoreProceduralPenaltiesIdDto } from "../score-procedural-penalties/score-procedural-penalties.dto";
import { MatchStageIdDto } from "../match-stages/match-stages.dto";
import { MatchShooterIdDto } from "../match-shooters/match-shooters.dto";
import { DqReasonIdDto } from "../dq-reasons/dq-reasons.dto";
import { MatchIdDto } from "../matches/matches.dto";

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

	matchStage: MatchStage;

	@ApiProperty({
		description: "The id of the match stage",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchStageId: number;

	matchShooter: MatchShooter;

	@ApiProperty({
		description: "The id of the match shooter",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchShooterId: number;

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

	@ApiProperty({
		description: "The id of the match",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchId: number;

	match: Match;
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
	"match",
] as const) {
	@ApiPropertyOptional({
		description: "proerror list",
		type: () => [ScoreProceduralPenaltiesIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested()
	@Type(() => ScoreProceduralPenaltiesIdDto)
	scoreProceduralPenalties?: ScoreProceduralPenalty[];

	@ApiProperty({
		description: "The id of the match stage",
		type: () => MatchStageIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => MatchStageIdDto)
	matchStage: MatchStage;

	@ApiProperty({
		description: "The id of the match shooter",
		type: () => MatchShooterIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => MatchShooterIdDto)
	matchShooter: MatchShooter;

	@ApiPropertyOptional({
		description: "The id of the dq reason",
		type: () => DqReasonIdDto,
	})
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => DqReasonIdDto)
	dqReason?: DQReason;

	@ApiPropertyOptional({
		description: "What's the version is this score",
		example: 2,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	iterations: number;

	@ApiProperty({
		description: "The id of the match",
		type: () => MatchIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => MatchIdDto)
	match: Match;
}

export class UpdateScoreDto extends PartialType(CreateScoreDto) {}

export class ScoreIdDto extends PickType(ScoreDto, ["id"] as const) {}
