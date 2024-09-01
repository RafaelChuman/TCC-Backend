import { DTOUpdateGroup } from "@src/entity/Order/InterfaceGroup";
import { RepositoryGroup } from "@src/entity/Order/RepositoryGroup";
import { Response, Request, response } from "express";

class UpdateGroup {
  async execute(request: Request, response: Response): Promise<Response> {
    const data: DTOUpdateGroup = {
      id: request.body.id,
      name: request.body.name,
      humidity: request.body.humidity,
      temperature: request.body.temperature,
      noBreak: request.body.noBreak,
    };

    const groupRepository = new RepositoryGroup();

    const resp = await groupRepository.update(data);

    return response.status(200).json(resp);
  }
}

export { UpdateGroup };
