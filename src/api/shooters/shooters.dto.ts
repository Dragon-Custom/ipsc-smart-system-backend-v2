import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";
import { MatchShooter, Score, Shooter, Team, User } from "src/entities";

export class ShooterDto extends Shooter {
	@ApiProperty({
		description: "Id of the shooter",
		example: 1,
		uniqueItems: true,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "First name of the shooter",
		example: "John",
	})
	@Type(() => String)
	@IsString()
	firstName: string;

	@ApiProperty({
		description: "Last name of the shooter",
		example: "Doe",
	})
	@Type(() => String)
	@IsString()
	lastName: string;

	@ApiProperty({
		description: "Full name of the shooter",
		example: "John Doe",
		readOnly: true,
	})
	@Type(() => String)
	@IsString()
	readonly fullName: string;

	@ApiProperty({
		description: "Date of creation of the shooter",
		example: "2022-01-01T00:00:00.000Z",
	})
	@IsDateString()
	createdAt: Date;

	//TODO: relation
	belongsUser?: User;

	@ApiPropertyOptional({
		description: "Id of the user the shooter belongs to",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	@IsOptional()
	readonly belongsUserId?: number;

	//TODO: relation
	team?: Team;

	@ApiPropertyOptional({
		description: "Id of the team the shooter belongs to",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	@IsOptional()
	readonly teamId?: number;

	//TODO: relation
	shooterOfMatches?: MatchShooter[];

	@ApiPropertyOptional({
		description: "Id of the matches the shooter is a part of",
		example: [1, 2, 3],
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt({ each: true })
	@IsOptional()
	readonly shooterOfMatchesId?: number[];

	//TODO: relation
	scores?: Score[];

	@ApiPropertyOptional({
		description: "Id of the scores the shooter has",
		example: [1, 2, 3],
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt({ each: true })
	@IsOptional()
	readonly scoresId?: number[];
}

export class ShooterCreateDto extends PickType(ShooterDto, [
	"firstName",
	"lastName",
	"belongsUser",
	"team",
] as const) {}

export class ShooterUpdateDto extends PartialType(ShooterCreateDto) {}

export class ShooterIdDto extends PickType(ShooterDto, ["id"] as const) {}
