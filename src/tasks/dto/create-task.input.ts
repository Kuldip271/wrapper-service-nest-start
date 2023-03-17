import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from '@prisma/client';

@InputType()
export class CreateTaskInput {
  @Field()
   name:string
 
}
