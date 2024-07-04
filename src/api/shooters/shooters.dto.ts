import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsArray,
	IsDateString,
	IsInt,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";
import { MatchShooter, Shooter, Team, User } from "src/entities";
import { UserIdDto } from "../users/users.dto";
import { TeamIdDto } from "../teams/teams.dto";
import { MatchShooterIdDto } from "../matches/match-shooters/match-shooters.dto";

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

	shooterOfMatches?: MatchShooter[];

	@ApiPropertyOptional({
		description: "Id of the matches the shooter is a part of",
		example: [1, 2, 3],
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt({ each: true })
	@IsOptional()
	readonly shooterOfMatchesIds?: number[];
}

export class CreateShooterDto extends PickType(ShooterDto, [
	"firstName",
	"lastName",
	"belongsUser",
	"team",
	"shooterOfMatches",
] as const) {
	@ApiPropertyOptional({
		description: "The user the shooter belongs to",
		type: () => UserIdDto,
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => UserIdDto)
	belongsUser?: User;

	@ApiPropertyOptional({
		description: "The team the shooter belongs to",
		type: () => TeamIdDto,
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => TeamIdDto)
	team?: Team;

	@ApiPropertyOptional({
		description: "The matches the shooter is a part of",
		type: () => [MatchShooterIdDto],
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => MatchShooterIdDto)
	shooterOfMatches?: MatchShooter[];
}

export class UpdateShooterDto extends PartialType(CreateShooterDto) {}

export class ShooterIdDto extends PickType(ShooterDto, ["id"] as const) {}
