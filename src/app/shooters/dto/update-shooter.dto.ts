import { PartialType } from "@nestjs/swagger";
import { CreateShooterDto } from "./create-shooter.dto";

export class UpdateShooterDto extends PartialType(CreateShooterDto) {}
