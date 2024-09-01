import { CreateCar } from "./CreateCar";
import { DeleteCar } from "./DeleteCar";
import { ListCar } from "./ListCar";
import { UpdateCar } from "./UpdateCar";



const createCar = new CreateCar();
const listCar = new ListCar();
const deleteCar = new DeleteCar();
const updateCar = new UpdateCar();

export { createCar, listCar, deleteCar,  updateCar};
