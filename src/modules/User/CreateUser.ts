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

      console.log("CreateUser request.body " + JSON.stringify(request.body));

      user.userId = request.body.userId;
      user.name = request.body.name;
      user.password = request.body.password;
      user.userName = request.body.userName;
      user.imgPath = request.body.imgPath;
      user.cellphone = request.body.cellphone;
      user.telegram = request.body.telegram;
      user.email = request.body.email;
      user.isAdmin = request.body.isAdmin;
      user.deleted = request.body.deleted;
      user.createdAt = request.body.createdAt;
      user.isAdmin = request.body.isAdmin;
      user.updated = request.body.updated;

      if (!user.password || !user.userName) {
        console.log(`CreateUser - execute Error: Data out of bounds.`);
        throw new AppError("Data out of bounds.");
      }

      const usersRepository = new RepositoryUser();

      const userNameAlredyExist = await usersRepository.findByUserName(
        user.userName
      );

      if (userNameAlredyExist) {
        console.log(`CreateUser - execute Error: User Already Exists.`);
        throw new AppError("User Already Exists.");
      }

      const passwordHash = await hash(user.password, 8);

      user.password = passwordHash;

      const resp = await usersRepository.create(user);

      return response.status(200).json(resp);
    } catch (e) {
      console.log(`CreateUser - execute Error: ${JSON.stringify(e)}`);
      return response.status(400).json(JSON.stringify(e));
    }
  }
}

export { CreateUser };
