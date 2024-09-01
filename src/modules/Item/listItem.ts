import { RepositoryItem } from "@src/entity/Item/RepositoryItem";
import { Response, Request } from "express";

class ListItem {
  async execute(request: Request, response: Response): Promise<Response> {
    
    const itemRespository = new RepositoryItem();
    const name = request.body?.name;
    
    if (name) {
      if (typeof name === "string") {
        const item = await itemRespository.findByName(name);

        return response.status(200).json(item);
      }
    }

    return response.status(422).json("Unprocessable Entity");
  }
}

export { ListItem };
