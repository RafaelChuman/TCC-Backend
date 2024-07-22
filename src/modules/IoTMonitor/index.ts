
import { IoTMonitorCreate } from "./IoTMonitorCreate";
import { IoTMonitorDelete } from "./IoTMonitorDelete";
import { IoTMonitorList } from "./IoTMonitorList";


const ioTMonitorCreate = new IoTMonitorCreate();
const ioTMonitorDelete = new IoTMonitorDelete();
const ioTMonitorList = new IoTMonitorList();

export { ioTMonitorCreate, ioTMonitorList, ioTMonitorDelete }