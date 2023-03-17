import { Field, Int, ObjectType } from "@nestjs/graphql"
import { User } from "src/users/entities/user.entity"

@ObjectType()
export class ResponseTask{

    @Field(()=>Int)
    id:number

    @Field()
    name:string

    @Field(()=>Int)
    userId:number


}