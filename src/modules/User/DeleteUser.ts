import { Response, Request } from "express";
import { DTODeleteUser } from "@src/entity/User/InterfaceUser";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { AppError } from "@src/errors/AppError";

export class DeleteUser {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      
      var id: string[] = request.body.userId;
      const userRepository = new RepositoryUser();

      if (id == null || id.length == 0)
        throw new AppError("Parâmetro userId incorreto", 503);

      const data: DTODeleteUser = {
        userId: id,
      };

      const resp = await userRepository.delete(data);
      return response.status(200).json(resp);

    } catch (e) {
      console.log(`DeleteUser - execute Error: ${JSON.stringify(e)}`);
      return response.status(422).json("Database not modified.");
    }
  }
}
