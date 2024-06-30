import { PickType } from "@nestjs/swagger";
import { Team } from "src/entities";

export class CreateTeamDto extends PickType(Team, [
	"name",
	"description",
	"ownerId",
] as const) {}
