import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateShooterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
