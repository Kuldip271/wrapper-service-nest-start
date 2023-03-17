import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field()
    username:string

    @Field()
    email:string

    @Field(()=>Int)
    age:number

    @Field({nullable:true})
    access_token?: string
}
