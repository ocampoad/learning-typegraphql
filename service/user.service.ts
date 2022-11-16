import { ApolloError } from "apollo-server";
import { CreateUserInput, LoginInput, UserModel } from "../src/schema/user.schema";
import Context from "../src/types/context";
import bcrypt from "bcrypt"
import { signJwt } from "../src/utils/jwt";

class UserService {
    async createUser(input: CreateUserInput){
        return UserModel.create(input);
    }

    async login(input: LoginInput, context: Context){
        // Get user by email
        const user = await UserModel.find().findByEmail(input.email).lean();

        if(!user){
            throw new ApolloError('Invalid email or password');
        }
        // validate password
        const passwordIsValid = await bcrypt.compare(input.password, user.password);
        
        if(!passwordIsValid){
            throw new ApolloError('Invalid email or password?');
        }
        // sign a jwt
        const token = signJwt(user);

        // set cookie for jwt
        context.res.cookie("accessToken", token, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })
        // return the jwt
        return token;
    }
}

export default UserService;