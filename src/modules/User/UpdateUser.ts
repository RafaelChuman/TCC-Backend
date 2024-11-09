import { hash } from "bcrypt";
import { AppError } from "@errors/AppError";
import { Response, Request } from "express";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { DTOCreateUser, DTOUpdateUser } from "@src/entity/User/InterfaceUser";
import { User } from "@src/entity/User/User";

export class UpdateUser {
  async execute(request: Request, response: Response): Promise<Response> {
    console.log("UpdateUser user ")

    const user = new User();

    user.userId = request.body.userId
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


    console.log("UpdateUser request.body " + JSON.stringify(request.body));

    const usersRepository = new RepositoryUser();

    if (user.password) {
      const passwordHash = await hash(user.password, 8);

      user.password = passwordHash;
    }

    const resp = await usersRepository.update(user);

    console.log("UpdateUser resp " + resp)
    return response.status(200).json(resp);
  }
}
