import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateShooterDto } from "./create-shooter.dto";

export class UpdateShooterDto extends OmitType(PartialType(CreateShooterDto), [
	"belongsUserId",
] as const) {}
