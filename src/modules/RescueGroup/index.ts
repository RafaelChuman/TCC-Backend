import { CreateRescueGroup } from "./createRescueGroup";
import { DeleteRescueGroup } from "./deleteRescueGroup";
import { ListRescueGroup } from "./listRescueGroup";
import { UpdateRescueGroup } from "./updateRescueGroup";


const createRescueGroup = new CreateRescueGroup();
const listRescueGroup = new ListRescueGroup();
const deleteRescueGroup = new DeleteRescueGroup();
const updateRescueGroup = new UpdateRescueGroup();

export {createRescueGroup, listRescueGroup, deleteRescueGroup, updateRescueGroup}
