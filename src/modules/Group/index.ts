import { CreateGroup } from "./createGroup";
import { DeleteGroup } from "./deleteGroup";
import { ListGroup } from "./listGroup";
import { UpdateGroup } from "./updateGroup";



const listGroup = new ListGroup()
const createGroup = new CreateGroup();
const deleteGroup = new DeleteGroup();
const updateGroup = new UpdateGroup();

export{
    listGroup, 
    createGroup,
    deleteGroup,
    updateGroup,
}