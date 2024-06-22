import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateShooterInput {
	@Field(() => String)
	firstName: string;

	@Field(() => String)
	lastName: string;

	@Field(() => Int)
	belongsUserId: number;
}
