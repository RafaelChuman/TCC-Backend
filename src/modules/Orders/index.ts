import { CreateOrders } from "./createOrder";
import { DeleteOrders } from "./deleteOrder";
import { ListOrders } from "./listOrders";
import { UpdateOrders } from "./updateOrder";


const createOrders = new CreateOrders();
const listOrders = new ListOrders();
const deleteOrders = new DeleteOrders();
const updateOrders = new UpdateOrders();

export {createOrders, listOrders, deleteOrders, updateOrders}
