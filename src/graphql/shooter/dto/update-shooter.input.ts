import { CreateShooterInput } from './create-shooter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShooterInput extends PartialType(CreateShooterInput) {
  @Field(() => Int)
  id: number;
}
