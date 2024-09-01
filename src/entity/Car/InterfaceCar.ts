import { DeleteResult, InsertResult } from "typeorm";
import { User } from "../User/User";
import { Car } from "./Car";

interface DTOCreateCar {
    brand: string;
    model: string;
    kind: string;
    type: string;
    plate: string;
    yearOfFabrication: number;
    yearOfModel: number;
    color: string;
    user: User;
};

interface DTOUpdateCar {
    id: string;
    brand: string;
    model: string;
    kind: string;
    type: string;
    plate: string;
    yearOfFabrication: number;
    yearOfModel: number;
    color: string;
    user: User;
};


interface DTODeleteCar {
    id: string[];
};

interface InterfaceCar {

    create(data: DTOCreateCar): Promise<InsertResult | null>;
    update(data: DTOUpdateCar): Promise<InsertResult | null>;
    listIoTByUser(userId: string): Promise<Car[] | null>;
    delete(data: DTODeleteCar): Promise<DeleteResult>;

};

export { InterfaceCar, DTOCreateCar, DTOUpdateCar, DTODeleteCar };