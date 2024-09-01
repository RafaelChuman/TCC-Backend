import { Response, Request } from "express";
import { DTOCreateItem } from "@src/entity/Item/InterfaceItem";
import { RepositoryItem } from "@src/entity/Item/RepositoryItem";

class CreateItem {
  async execute(request: Request, response: Response): Promise<Response> {
    
    const groupRepository = new RepositoryItem();
    
    const data: DTOCreateItem = {
      type: request.body.type,
      name: request.body.name,
    };

    const groupNameAlredyExist = await groupRepository.findByName(data.name);

    if (groupNameAlredyExist) {
      return response.status(200).json("Item Already Exists.");
    }

    const resp = await groupRepository.create(data);

    return response.status(200).json(resp);
  }
}

export { CreateItem };
