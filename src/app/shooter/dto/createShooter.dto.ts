import { PickType } from "@nestjs/swagger";
import { ShooterDto } from "./shooter.dto";

export class CreateShooterDto extends PickType(ShooterDto, [
	"firstName",
	"lastName",
	"teamId",
] as const) {}
