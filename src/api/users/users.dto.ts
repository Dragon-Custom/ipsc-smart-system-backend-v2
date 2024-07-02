import { PickType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import {
	IsArray,
	IsBoolean,
	IsDateString,
	IsEmail,
	IsInt,
	IsOptional,
	IsString,
	IsStrongPassword,
} from "class-validator";
import { MatchStaff, Shooter, Stage, Team, User } from "src/entities";

export class UserDto extends User {
	@ApiProperty({
		description: "Id of the user",
		example: 1,
		uniqueItems: true,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	//TODO: relation
	shooterProfile?: Shooter;

	@ApiPropertyOptional({
		description: "Id of the shooter profile",
		example: 1,
		readOnly: true,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	readonly shooterProfileId?: number;

	@ApiProperty({
		description: "Nickname of the user",
		example: "John Doe",
	})
	@Type(() => String)
	@IsString()
	nickname: string;

	@ApiProperty({
		description: "Email of the user",
		example: "john.doe@example.com",
	})
	@Type(() => String)
	@IsEmail()
	email: string;

	@Exclude()
	encryptedPassword: string;

	@Exclude()
	password: string;

	@ApiProperty({
		description: "Date of creation of the user",
		example: "2022-01-01T00:00:00.000Z",
	})
	@IsDateString()
	createdAt: Date;

	//TODO: relation
	ownsTeam?: Team;

	@ApiPropertyOptional({
		description: "Id of the team the user owns",
		example: 1,
		readOnly: true,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	readonly ownsTeamId?: number;

	//TODO: relation
	adminOfTeam?: Team;

	@ApiPropertyOptional({
		description: "Id of the team the user is an admin of",
		example: 1,
		readOnly: true,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	readonly adminOfTeamId?: number;

	//TODO: relation
	designedStages?: Stage[];

	@ApiPropertyOptional({
		description: "Id of the stages the user designed",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly designedStagesId?: number[];

	//TODO: relation
	stuffOfMatches?: MatchStaff[];

	@ApiPropertyOptional({
		description: "Id of the matches the user is a staff of",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly stuffOfMatchesId?: number[];

	@ApiProperty({
		description: "Is the user active",
		example: true,
	})
	@Type(() => Boolean)
	@IsBoolean()
	isActive: boolean;

	@ApiProperty({
		description: "Is the user banned",
		example: false,
	})
	@Type(() => Boolean)
	@IsBoolean()
	isBanned: boolean;
}

export class UserCreateDto extends PickType(UserDto, [
	"nickname",
	"email",
] as const) {
	@ApiProperty({
		description: "Password of the user",
		example: "password123",
	})
	@IsStrongPassword()
	password: string;
}

export class UserUpdateDto extends PartialType(UserCreateDto) {}

export class UserIdDto extends PickType(UserDto, ["id"] as const) {}
