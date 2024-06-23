import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsInt, IsString } from "class-validator";
import { User } from "src/entities";

export class UserDto extends PickType(User, [
	"id",
	"nickname",
	"email",
	"createdAt",
] as const) {
	@ApiProperty()
	@IsInt()
	id: number;

	@ApiProperty()
	@IsString()
	nickname: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsDateString()
	createdAt: Date;
}
