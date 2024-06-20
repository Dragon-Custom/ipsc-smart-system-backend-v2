import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import config from "src/config";

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	nickname: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsStrongPassword({ ...config.api.passwordOption })
	password: string;
}
