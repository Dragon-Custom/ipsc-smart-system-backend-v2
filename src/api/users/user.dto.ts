import { PickType } from "@nestjs/mapped-types";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import {
	IsEmail,
	IsInt,
	IsOptional,
	IsString,
	IsStrongPassword,
} from "class-validator";
import config from "src/config";
import { User } from "src/entities";

export class UserDto extends OmitType(User, ["password"]) {
	@Exclude()
	password: string;

	@Exclude()
	deletedAt: Date;
}

export class CreateUserDto extends PickType(UserDto, [
	"email",
	"nickname",
	"shooterProfileId",
] as const) {
	@ApiProperty({
		example: "john.doe@example.com",
		description: "Email of the user",
	})
	@IsEmail()
	email: string;

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
		example: "213",
		description: "Shooter profile id of the user",
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	shooterProfileId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
