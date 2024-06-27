import { PickType } from "@nestjs/swagger";
import { Shooter } from "src/entities";

export class CreateShooterDto extends PickType(Shooter, [
	"firstName",
	"lastName",
	"teamId",
] as const) {}
