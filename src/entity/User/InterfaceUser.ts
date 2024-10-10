import { DeleteResult, InsertResult } from "typeorm";
import { User } from "./User";

interface DTOCreateUser {
  name: string;
  userName: string;
  password: string;
  imgPath: string;
  email: string;
  cellphone: string;
  telegram: string;
  isAdmin: boolean;
}

interface DTOUpdateUser {
  userId: string;
  name: string;
  userName: string;
  password: string;
  imgPath: string;
  email: string;
  cellphone: string;
  telegram: string;
  isAdmin: boolean;
}

interface DTODeleteUser {
  userId: string[];
}

interface DTOAuthenticateUser {
  userName: string;
  password: string;
}

interface UserToken {
  userId: string;
  userName: string;
  isAdmin: boolean;
}

interface InterfaceUser {
  create(data: DTOCreateUser): Promise<InsertResult | null>;
  delete(data: DTODeleteUser): Promise<DeleteResult | null>;
  update(user: DTOUpdateUser): Promise<User | null>;
  list(): Promise<User[]>;
  findByUserName(userName: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  listAllUsersGroupedByMonth(): Promise<User[] | null>;
}

export {
  InterfaceUser,
  DTOCreateUser,
  DTOAuthenticateUser,
  DTODeleteUser,
  DTOUpdateUser,
  UserToken,
};
