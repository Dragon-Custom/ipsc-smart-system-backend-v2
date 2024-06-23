import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import config from "src/config";
import { User } from "src/entities";

export class CreateUserDto extends PickType(User, [
	"nickname",
	"email",
] as const) {
	@ApiProperty()
	@IsString()
	nickname: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	@IsStrongPassword(config.security.password.strongPasswordCriteria)
	password: string;
}
