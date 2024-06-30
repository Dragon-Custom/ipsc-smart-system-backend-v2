import { PickType } from "@nestjs/mapped-types";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import {
	IsBoolean,
	IsDate,
	IsEmail,
	IsInt,
	IsOptional,
	IsString,
	IsStrongPassword,
} from "class-validator";
import config from "src/config";
import { MatchStaff, Shooter, Stage, Team, User } from "src/entities";

export class UserDto extends User {
	@Exclude()
	password: string;

	@Exclude()
	deletedAt: Date;

	@ApiProperty({
		example: 1,
		description: "Id of the user",
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@Exclude()
	shooterProfile: Shooter;

	@ApiProperty({
		example: 1,
		description: "Shooter profile id of the user",
		required: false,
		nullable: true,
	})
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	shooterProfileId?: number;

	@ApiProperty({
		example: "John Doe",
		description: "Nickname of the user",
	})
	@IsString()
	nickname: string;

	@ApiProperty({
		example: "john.doe@example.com",
		description: "Email of the user",
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		example: new Date(),
		description: "Date of creation of the user",
	})
	@IsDate()
	createdAt: Date;

	@ApiProperty({
		example: new Date(),
		description: "Date of last update of the user",
	})
	@IsDate()
	updatedAt: Date;

	@Exclude()
	ownsTeam: Team;

	@ApiProperty({
		example: 1,
		description: "Id of the team that the user owns",
		required: false,
		nullable: true,
	})
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	ownerOfTeamId?: number;

	@Exclude()
	adminOfTeam: Team;

	@ApiProperty({
		example: 1,
		description: "Id of the team that the user is an admin of",
		required: false,
		nullable: true,
	})
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	adminOfTeamId?: number;

	@Exclude()
	designedStages: Stage[];

	@Exclude()
	stuffOfMatches: MatchStaff[];

	@ApiProperty({
		example: true,
		description: "Is the user active",
	})
	@IsBoolean()
	isActive: boolean;

	@ApiProperty({
		example: false,
		description: "Is the user banned",
	})
	@IsBoolean()
	isBanned: boolean;
}

export class CreateUserDto extends PickType(UserDto, [
	"email",
	"nickname",
	"shooterProfileId",
] as const) {
	@ApiProperty({
		example: "johndoe123",
		description: "Password of the user",
	})
	@IsStrongPassword(config.security.passwordOptions)
	password: string;

	@ApiProperty({
		example: "John Doe",
		description: "Nickname of the user",
	})
	@IsString()
	nickname: string;

	@ApiProperty({
		example: "john.doe@example.com",
		description: "Email of the user",
	})
	@IsEmail()
	email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
