import { DeleteResult } from "typeorm";
import { User } from "./User";

interface DTOCreateUser {
  name: string;
  userName: string;
  password: string;
  isAdmin: boolean;
  imgPath: string;
  email: string;
  celular: number;
  telegram: string;
}

interface DTOUpdateUser {
  id: string;
  name: string;
  password: string;
  isAdmin: boolean;
  imgPath: string;
  email: string;
  celular: number;
  telegram: string;
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
  create(data: DTOCreateUser): Promise<User>;
  delete(data: DTODeleteUser): Promise<DeleteResult>;
  update(user: DTOUpdateUser): Promise<User | null>;
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
