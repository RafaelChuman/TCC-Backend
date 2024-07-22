import { hash } from "bcrypt";
import { AppError } from "@errors/AppError";
import { Response, Request } from "express";
import { DTOCreateGroup } from "@src/entity/Group/InterfaceGroup";
import { RepositoryGroup } from "@src/entity/Group/RepositoryGroup";

class CreateGroup {
  async execute(request: Request, response: Response): Promise<Response> {
    
    
    
    const data: DTOCreateGroup = {
      name: request.body.name,

      temperature: request.body.temperature,
      humidity: request.body.humidity,
      noBreak: request.body.noBreak,

      userId: request.headers.userId?.toString()  || "",
    };
    
    const groupRepository = new RepositoryGroup();

    const groupNameAlredyExist = await groupRepository.findByName(data.name);

    if (groupNameAlredyExist) {
      return response.status(200).json("Group Already Exists.");
    }

    const resp = await groupRepository.create(data);

    return response.status(200).json(resp);
  }
}

export { CreateGroup };
