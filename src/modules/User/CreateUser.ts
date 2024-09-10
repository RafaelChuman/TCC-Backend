import { hash } from "bcrypt";
import { AppError } from "@errors/AppError";
import { Response, Request } from "express";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { DTOCreateUser } from "@src/entity/User/InterfaceUser";
import { User } from "@src/entity/User/User";

class CreateUser {
  async execute(request: Request, response: Response): Promise<Response> {
    
    const user = new User();
    
    user.id = request.body.id
    user.name = request.body.name
    user.password = request.body.password
    user.userName = request.body.userName
    user.imgPath = request.body.imgPath
    user.cellphone = request.body.cellphone
    user.telegram = request.body.telegram
    user.email = request.body.email
    user.isAdmin = request.body.isAdmin
    user.createdAt = request.body.createdAt
    user.isAdmin = request.body.isAdmin
    user.updated = request.body.updated
    
    const usersRepository = new RepositoryUser();

    const userNameAlredyExist = await usersRepository.findByUserName(user.userName);

    if (!user.password || !user.userName ) {
      throw new AppError("Data out of bounds.");
    }

    if (userNameAlredyExist) {
      throw new AppError("User Already Exists.");
    }

    const passwordHash = await hash(user.password, 8);

    user.password = passwordHash;

    const resp = await usersRepository.create(user);

    return response.status(200).json(resp);
  }
}

export { CreateUser };
