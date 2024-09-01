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
  id: string;
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
  ids: string[];
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
  create(data: DTOCreateUser): Promise<InsertResult>;
  delete(data: DTODeleteUser): Promise<DeleteResult>;
  update(user: DTOUpdateUser): Promise<InsertResult | null>;
  list(): Promise<User[]>;
  findByUserName(userName: string): Promise<User | null>;
  findById(IdParm: string): Promise<User | null>;
  listAllUsersGroupedByMonth(): Promise<User[]>;
}

export {
  InterfaceUser,
  DTOCreateUser,
  DTOAuthenticateUser,
  DTODeleteUser,
  DTOUpdateUser,
  UserToken,
};
