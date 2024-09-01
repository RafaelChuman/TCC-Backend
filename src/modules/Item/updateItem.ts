import { DTOUpdateItem } from "@src/entity/Item/InterfaceItem";
import { RepositoryItem } from "@src/entity/Item/RepositoryItem";
import { Response, Request, response } from "express";

class UpdateItem {
  async execute(request: Request, response: Response): Promise<Response> {
    
    const itemRepository = new RepositoryItem();

    const data: DTOUpdateItem = {
      id : request.body.id,
      type : request.body.type,
      name : request.body.name,
    };

    const resp = await itemRepository.update(data);

    return response.status(200).json(resp);
  }
}

export { UpdateItem };
