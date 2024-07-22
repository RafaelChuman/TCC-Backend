import { CreateUser } from "./CreateUser";
import { DeleteUser } from "./DeleteUser";
import { ListUser } from "./ListUser";
import { UpdateUser } from "./UpdateUser";
import { AuthenticaUser } from "./authenticateUser";



const listUser = new ListUser()
const authenticaUser = new AuthenticaUser();
const createUser = new CreateUser();
const deleteUser = new DeleteUser();
const updateUser = new UpdateUser();


export{
    listUser, 
    authenticaUser,
    createUser,
    updateUser,
    deleteUser
}