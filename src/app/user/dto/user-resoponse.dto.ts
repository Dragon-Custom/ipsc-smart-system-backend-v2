import { PickType } from "@nestjs/swagger";
import { User } from "src/entities";

export class UserResponseDTO extends PickType(User, [
	"id",
	"createdAt",
	"email",
	"isActive",
	"isBanned",
	"nickname",
] as const) {}
