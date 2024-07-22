import { DeleteResult } from "typeorm";
import { IoT } from "./IoT";
import { Group } from "../Group/Group";
import { User } from "../User/User";

interface DTOCreateIoT{
    name: string;
    group: Group;
};

interface DTOUpdateIoT{
    id: string;
    name: string;
    group: Group;
};


interface DTODeleteIoT{
    ioT: IoT[];
};

interface InterfaceIoT{
    
    update(data: DTOUpdateIoT): Promise<IoT | null>;
    create(data: DTOCreateIoT): Promise<IoT | null>;
    listIoTByUser(userId: string): Promise<IoT[] | null>;
    delete(data: DTODeleteIoT): Promise<IoT[]>;
    
};

export {InterfaceIoT, DTOCreateIoT, DTODeleteIoT, DTOUpdateIoT};