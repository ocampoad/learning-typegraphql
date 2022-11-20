import { Query, Mutation, Resolver, Arg, Ctx} from "type-graphql";
import UserService from "../../service/user.service";
import { User, CreateUserInput, LoginInput } from "../schema/user.schema";
import Context from "../types/context";


@Resolver()
export default class UserResolver {

    constructor(private userService: UserService){
        this.userService = new UserService();
    };

    @Mutation(() => User)
    createUser(@Arg('input') input: CreateUserInput){
        return this.userService.createUser(input);
    }

    @Mutation(() => String)
    login(@Arg('input') input: LoginInput, @Ctx() context: Context){
        return this.userService.login(input, context);
    }

    @Query(() => User)
    me(@Ctx() context: Context){
        return context.user;
    }
}