import { Field, InputType, Int } from "@nestjs/graphql"
import { IsAlphanumeric, IsEmail } from "class-validator"

@InputType()
export class SignupUserInput{
    @Field()
    @IsAlphanumeric()
    username:string

    @IsEmail({},{message:"email is not valid"})
    @Field()
    email:string

    @Field()
    password:string

    @Field(()=>Int,{nullable:true})
    age?:number
}