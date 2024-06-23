import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Shooter } from "src/entities";

export class CreateShooterDto extends PickType(Shooter, [
	"firstName",
	"lastName",
] as const) {
	@ApiProperty()
	@IsString()
	firstName: string;

	@ApiProperty()
	@IsString()
	lastName: string;
}
