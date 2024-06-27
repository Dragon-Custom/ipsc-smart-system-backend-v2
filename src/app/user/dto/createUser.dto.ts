import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString, IsStrongPassword } from "class-validator";
import config from "src/config";
import { User } from "src/entities";

export class CreateUserDto extends PickType(User, [
	"nickname",
	"email",
] as const) {
	@ApiProperty()
	@IsString()
	@IsStrongPassword(config.security.password.strongPasswordCriteria)
	password: string;
}
