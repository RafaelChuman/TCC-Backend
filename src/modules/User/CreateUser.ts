import { hash } from "bcrypt";
import { AppError } from "@errors/AppError";
import { Response, Request } from "express";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { DTOCreateUser } from "@src/entity/User/InterfaceUser";
import { User } from "@src/entity/User/User";
import { json } from "stream/consumers";

class CreateUser {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const user = new User();

      console.log("CreateUser request.body " + JSON.stringify(request.body))

      request.body.forEach((element: User)  => {
        user.id = element.id
        user.name = element.name
        user.password = element.password
        user.userName = element.userName
        user.imgPath = element.imgPath
        user.cellphone = element.cellphone
        user.telegram = element.telegram
        user.email = element.email
        user.isAdmin = element.isAdmin
        user.createdAt = element.createdAt
        user.isAdmin = element.isAdmin
        user.updated = element.updated
      }); 

      const usersRepository = new RepositoryUser();

      const userNameAlredyExist = await usersRepository.findByUserName(user.userName);

      if (!user.password || !user.userName) {
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
    catch (e) {
      console.log(`CreateUser - execute Error: ${JSON.stringify(e)}`)
      return response.status(400).json(JSON.stringify(e));
    }
    return response.status(200).json("");
  }
}

export { CreateUser };
