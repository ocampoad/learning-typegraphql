import { UserModel } from "../src/schema/user.schema";

class UserService {
    async createUser(input: any){
        return UserModel.create(input);
    }
}

export default UserService;