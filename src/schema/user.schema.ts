import { prop, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import { IsEmail, MinLength, MaxLength } from "class-validator";

@ObjectType()
export class User {
    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({required: true})
    name: string

    @Field(() => String)
    @prop({required: true})
    email: string
    
    @prop({required: true})
    password: string
    
}

export const UserModel = getModelForClass(User);

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name:string; 

    @IsEmail()
    @Field(() => String)
    email:string; 

    @MinLength(6, {
        message: 'password must be at least 6 characters long'
    })
    @MaxLength(50, {
        message: 'password must be no longer than 50 characters'
    })
    @Field(() => String)
    password:string; 
}