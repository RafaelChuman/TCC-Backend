
import { CreateOrderAndItems } from "./CreateOrderAndItems";
import { DeleteOrderAndItems } from "./DeleteOrderAndItems";
import { ListOrderAndItems } from "./ListOrderAndItems";


const createOrderAndItems = new CreateOrderAndItems();
const deleteOrderAndItems = new DeleteOrderAndItems();
const listOrderAndItems = new ListOrderAndItems();

export { createOrderAndItems, deleteOrderAndItems, listOrderAndItems }