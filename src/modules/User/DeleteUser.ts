import { Response, Request } from "express";
import { DTODeleteUser } from "@src/entity/User/InterfaceUser";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";

export class DeleteUser {
  async execute(request: Request, response: Response): Promise<Response> {
    const idParam: string[] = request.body.ids;

    if (idParam.length > 0) {
      const data: DTODeleteUser = {
        ids: idParam,
      };
      
      const userRepository = new RepositoryUser();

      const resp = await userRepository.delete(data);

      return response.status(200).json(resp);
    }

    return response.status(200).json("Database not modified.");;
  }
}


