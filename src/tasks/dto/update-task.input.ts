import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field(()=>Int)
  id:number

  
  @Field()
  name:string
 
}
