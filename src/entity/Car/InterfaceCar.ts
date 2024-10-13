import { DeleteResult, InsertResult } from "typeorm";
import { User } from "../User/User";
import { Car } from "./Car";

interface DTOCreateCar {
    carId: string;
    brand: string;
    model: string;
    kind: string;
    type: string;
    plate: string;
    yearOfFabrication: number;
    yearOfModel: number;
    color: string;
    createdAt: Date;
    deleted: boolean;
    updated: Date;
    userId: string;
};

interface DTOUpdateCar {
    carId: string;
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
    carId: string[];
};

interface InterfaceCar {

    create(data: Car): Promise<InsertResult | null>;
    update(data: DTOUpdateCar): Promise<Car | null>;
    listCarByUser(userId: string): Promise<Car[] | null>;
    listCarByPlate(plate: string): Promise<Car[] | null>;
    listCarById(carId: string): Promise<Car | null>;
    listAll(): Promise<Car[] | null> ;
    findByIdVector(carId: string[]): Promise<Car[] | null>;
    findById(carId: string): Promise<Car | null>;
    delete(data: DTODeleteCar): Promise<DeleteResult | null>;

};

export { InterfaceCar, DTOCreateCar, DTOUpdateCar, DTODeleteCar };