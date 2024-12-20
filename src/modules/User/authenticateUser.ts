import { compare } from "bcrypt";
import { AppError } from "@errors/AppError";
import { sign } from "jsonwebtoken";
import { Response, Request } from "express";
import { UserToken } from "@src/entity/User/InterfaceUser";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";

class AuthenticaUser {
  async execute(request: Request, response: Response): Promise<Response> {
    const userRespository = new RepositoryUser();
    const { userName, password } = request.body;

    const user = await userRespository.findByUserName(userName);

    if (!user) {
      throw new AppError("User incorrect.");
    }

    //Do not. It must be implemented at prodution
    const passwordMatch = await compare(password, user.password);
    //const passwordMatch = password == user.password;


    console.log(request.body.password + " --- " + user.password + " === " + passwordMatch)

    if (!passwordMatch) {
      throw new AppError("Password incorrect.");
    }

    

    const userToken: UserToken = {
      isAdmin: user.isAdmin,
      userName: user.userName,
      userId: user.userId,
    };

    const resp  = {
      isAdmin: user.isAdmin,
      userName: user.userName,
      userId: user.userId,
      token: sign(userToken, "brasil123",  {expiresIn: "10h"})
    };

    

    return response.status(200).json(resp);
  }
}

export { AuthenticaUser };
