import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class Response{
    @Field({nullable: true})
    access_token?:string

    @Field(()=>User, {nullable:true})
    user:User



    // @Field(()=> [String],{nullable : true})
    // userfromredis : [string] 
   

}