import { hash } from "bcrypt";
import { AppError } from "@errors/AppError";
import { Response, Request } from "express";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { DTOCreateUser, DTOUpdateUser } from "@src/entity/User/InterfaceUser";

export class UpdateUser {
  async execute(request: Request, response: Response): Promise<Response> {
    const data: DTOUpdateUser = {
      id: request.body.id,
      name: request.body.name,
      password: request.body.password,

      imgPath: request.body.imgPath,
      celular: request.body.celular,
      telegram: request.body.telegram,
      email: request.body.email,

      isAdmin: false,
    };

    const usersRepository = new RepositoryUser();

    if (data.password) {
      const passwordHash = await hash(data.password, 8);

      data.password = passwordHash;
    }

    const resp = await usersRepository.update(data);

    return response.status(200).json(resp);
  }
}
