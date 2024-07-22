import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { RescueGroup } from "./RescueGroup";
import { Group } from "../Group/Group";
import { User } from "../User/User";

interface DTOCreateRescueGroup {
  group: Group;
  users: User[];
}

interface DTODeleteRescueGroup {
  ids: string[];
}

interface DTOUpdateRescueGroup {
  group: Group;
  users: User[];
}

interface InterfaceRescueGroup {
  create(data: DTOCreateRescueGroup): Promise<InsertResult>;
  findByUser(idUser: string): Promise<RescueGroup[] | null>;
  findByGroup(groupId: string): Promise<RescueGroup[] | null>;
  deleteByGroup(data: DTODeleteRescueGroup): Promise<DeleteResult>;
  delete(data: DTODeleteRescueGroup): Promise<DeleteResult>;
  updateByGroup(data: DTOUpdateRescueGroup): Promise<InsertResult>;
}

export {
  InterfaceRescueGroup,
  DTOCreateRescueGroup,
  DTODeleteRescueGroup,
  DTOUpdateRescueGroup,
};
