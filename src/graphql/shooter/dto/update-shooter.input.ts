import { CreateShooterInput } from "./create-shooter.input";
import { InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateShooterInput extends PartialType(CreateShooterInput) {}
