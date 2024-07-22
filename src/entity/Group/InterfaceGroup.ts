import { DeleteResult } from "typeorm";
import { Group } from "./Group";
import { User } from "../User/User";

interface DTOCreateGroup {
  name: string;
  temperature: number;
  humidity: number;
  noBreak: number;
  userId: string;
}

interface DTODeleteGroup {
  ids: string[];
}

interface DTOUpdateGroup {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  noBreak: number;
}

interface InterfaceGroup {
  create(data: DTOCreateGroup): Promise<Group>;
  delete(data: DTODeleteGroup): Promise<DeleteResult>;
  update(data: DTOUpdateGroup): Promise<Group | null>;
  listByUser(userId: string): Promise<Group[]>;
  findByName(groupName: string): Promise<Group | null>;
  findByIoT(idIoT: string): Promise<Group | null>;
}

export { InterfaceGroup, DTOCreateGroup, DTODeleteGroup, DTOUpdateGroup };
