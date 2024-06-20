import { PickType } from "@nestjs/swagger";
import { Shooter } from "src/entities";

export class ShooterResponseDTO extends PickType(Shooter, [
	"id",
	"createdAt",
	"firstName",
	"lastName",
	"fullName",
] as const) {}
