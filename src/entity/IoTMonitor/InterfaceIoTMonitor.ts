import { DeleteResult } from "typeorm";
import { IoT } from "../IoT/IoT";
import { User } from "../User/User";
import { IoTMonitor } from "./IoTMonitor";

interface DTOCreateIoTMonitor {
  temperature: number;
  humidity: number;
  noBreak: boolean;
  ioTId: string;
}

interface DTOListIoTMonitorByIoT {
  ioT: IoT[];
  dateBegin?: Date;
  dateEnd?: Date;
}

interface DTOListIoTMonitorByUser {
  userId: string;
  dateBegin?: Date;
  dateEnd?: Date;
}

interface DTODeleteIoTMonitor {
  ioTMonitor: IoTMonitor[];
}

interface InterfaceIoTMonitor {
  create(data: DTOCreateIoTMonitor): Promise<IoTMonitor | null>;
  listByIoT(data: DTOListIoTMonitorByIoT): Promise<IoTMonitor[] | null>;
  listByUser(data: DTOListIoTMonitorByUser): Promise<IoTMonitor[] | null>;
  delete(data: DTODeleteIoTMonitor): Promise<IoTMonitor[]>;
}

export {
  InterfaceIoTMonitor,
  DTOCreateIoTMonitor,
  DTOListIoTMonitorByIoT,
  DTOListIoTMonitorByUser,
  DTODeleteIoTMonitor,
};
