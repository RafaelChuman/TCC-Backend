import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { Item } from "./Item";

interface DTOCreateItem {
  type: string;
  name: string;
}

interface DTODeleteItem {
  ids: string[];
}

interface DTOUpdateItem {
  id: string;
  type: string;
  name: string;
}

interface InterfaceItem {
  create(data: DTOCreateItem): Promise<InsertResult | null>;
  findByName(name: string): Promise<Item[] | null>;
  delete(data: DTODeleteItem): Promise<DeleteResult>;
  update(data: DTOUpdateItem): Promise<InsertResult | null>;
}

export {
  InterfaceItem,
  DTOCreateItem,
  DTODeleteItem,
  DTOUpdateItem,
};
