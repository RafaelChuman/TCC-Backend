import { IoTCreate } from "./IoTCreate";
import { IoTDelete } from "./IoTDelete";
import { IoTList } from "./IoTList";
import { IoTUpdate } from "./IoTUpdate";



const ioTCreate = new IoTCreate();
const ioTList = new IoTList();
const ioTDelete = new IoTDelete();
const ioTUpdate = new IoTUpdate();

export { ioTCreate, ioTDelete, ioTUpdate,  ioTList};
