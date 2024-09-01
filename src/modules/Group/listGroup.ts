import { RepositoryGroup } from "@src/entity/Order/RepositoryGroup";
import { AppError } from "@src/errors/AppError";
import { Response, Request } from "express";

class ListGroup {
  async execute(request: Request, response: Response): Promise<Response> {
    const groupRespository = new RepositoryGroup();
    const userId = request.headers?.userId;
    const name = request.body?.name;
    const idIoT = request.query?.idIoT;
    
    if (name) {
      if (typeof name === "string") {
        const group = await groupRespository.findByName(name);

        return response.status(200).json(group);
      }
    }

    if (idIoT) {
      if (typeof idIoT === "string") {
        const group = await groupRespository.findByIoT(idIoT);

        return response.status(200).json(group);
      }
    }

    if (userId) {
      if (typeof userId === "string") {
        const group = await groupRespository.listByUser(userId);

        return response.status(200).json(group);
      }
    }

    return response.status(422).json("Unprocessable Entity");
  }
}

export { ListGroup };
