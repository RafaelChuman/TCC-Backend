import { AppError } from "@errors/AppError";
import { UserToken } from "@src/entity/User/InterfaceUser";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Bearer dkdfvmdlkfvmkdm
  const token = request.headers.authorization;

  if (!token) {
    throw new AppError("Token Missing", 401);
  }

  try {
    const decoded = verify(token, "brasil123");

    if (!decoded || typeof decoded == "string") {
      throw new AppError("User does not exist.", 401);
    }

    const userToken: UserToken = {
      userId: decoded.userId,
      userName: decoded.userName,
      isAdmin: decoded.isAdmin,
    };

    //const userRespository = new RepositoryUser();

    //Trow the user Paramrs to the next function. So after the validation midleware
    //We don't need to ask to the database for the datas of ho is logged
    //We have this problem because the Token only pass the ID and nothing more
    //const user = await userRespository.findById(userToken.userId);

    // if (!user) {
    //   throw new AppError("User does not exist.", 401);
    // }

    request.headers.userId = userToken.userId;
    request.headers.userName = userToken.userName;
    request.headers.isAdmin = String(userToken.isAdmin);

    next();
  } catch {
    request.headers.userId = "";
    request.headers.userName = "";
    request.headers.isAdmin = "";

    throw new AppError("Invalid Token", 401);
  }
}
