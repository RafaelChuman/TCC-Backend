import { PostgresDS } from "@src/data-source";
import {
  InterfaceItem,
  DTOCreateItem,
  DTODeleteItem,
  DTOUpdateItem,
} from "./InterfaceItem";
import { DeleteResult, In, InsertResult, UpdateResult } from "typeorm";
import { Item } from "./Item";

class RepositoryItem implements InterfaceItem {
  async create(data: DTOCreateItem): Promise<InsertResult | null> {

    const newItem: Item = new Item();

    if(data == null) return null

    newItem.type = data.type
    newItem.name = data.name

    const resp = await PostgresDS.manager.insert(Item, newItem);

    return resp;
  }

  async findByName(name: string): Promise<Item[] | null> {
    const itemRepository = PostgresDS.manager.getRepository(Item);

    return await itemRepository.find({
      where: {
        name: name
      },
    });
  }



  async delete(data: DTODeleteItem): Promise<DeleteResult> {
    const itemResponse = await PostgresDS.manager.delete(Item, {
      id: In(data.ids),
    });

    return itemResponse;
  }

  async update(item: DTOUpdateItem): Promise<InsertResult |  null> {

    const updItem: Item = new Item();

    if(item == null) return null

    updItem.type = item.type
    updItem.name = item.name

    updItem.deleted = false
    updItem.updated = new Date(Date.now())


    const itemResponse = await PostgresDS.manager.insert(Item,  updItem);

    return itemResponse;
  }

}

export { RepositoryItem };
