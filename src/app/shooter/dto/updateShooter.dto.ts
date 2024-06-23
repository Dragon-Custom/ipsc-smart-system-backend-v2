import { PartialType } from "@nestjs/swagger";
import { CreateShooterDto as CreateShooterDto } from "./createShooter.dto";

export class UpdateShooterDto extends PartialType(CreateShooterDto) {}
