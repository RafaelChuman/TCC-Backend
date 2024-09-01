import { IoTCreate } from "./CreateCar";
import { IoTDelete } from "./DeleteCar";
import { IoTList } from "./ListCar";
import { IoTUpdate } from "./UpdateCar";



const ioTCreate = new IoTCreate();
const ioTList = new IoTList();
const ioTDelete = new IoTDelete();
const ioTUpdate = new IoTUpdate();

export { ioTCreate, ioTDelete, ioTUpdate,  ioTList};
