import { hash } from "bcrypt";
import { AppError } from "@errors/AppError";
import { Response, Request } from "express";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { DTOCreateUser } from "@src/entity/User/InterfaceUser";

class CreateUser {
  async execute(request: Request, response: Response): Promise<Response> {
    const data: DTOCreateUser = {
      name: request.body.name,
      password: request.body.password,
      userName: request.body.userName,
      
      imgPath: request.body.imgPath,
      celular: request.body.celular,
      telegram: request.body.telegram,
      email: request.body.email,

      isAdmin: false,
    };
    const usersRepository = new RepositoryUser();

    const userNameAlredyExist = await usersRepository.findByUserName(data.userName);

    if (!data.password || !data.userName ) {
      throw new AppError("Data out of bounds.");
    }

    if (userNameAlredyExist) {
      throw new AppError("User Already Exists.");
    }

    const passwordHash = await hash(data.password, 8);

    data.password = passwordHash;

    const resp = await usersRepository.create(data);

    return response.status(200).json(resp);
  }
}

export { CreateUser };
