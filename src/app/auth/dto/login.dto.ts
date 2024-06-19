import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";
import config from "src/config";

export class LoginDTO {
	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsStrongPassword({ ...config.api.passwordOption })
	password: string;
}
