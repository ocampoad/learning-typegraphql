import { ApolloError } from "apollo-server";
import { CreateUserInput, LoginInput, UserModel } from "../src/schema/user.schema";
import Context from "../src/types/context";
import bcrypt from "bcrypt"

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
            throw new ApolloError('Invalid email or password');
        }
        // sign a jwt

        // set cookie for jwt

        // return the jwt
    }
}

export default UserService;