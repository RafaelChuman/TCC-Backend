import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { AppError } from "@src/errors/AppError";
import { Response, Request } from "express";

class ListUser {
  async execute(request: Request, response: Response): Promise<Response> {
    const userRespository = new RepositoryUser();
    const userName = request.query?.userName;
    const groupByMonth = request.query?.groupByMonth;

    if (userName) {
      if (typeof userName === "string") {
        const user = await userRespository.findByUserName(userName);

        return response.status(200).json(user);
      }
    }

    if (groupByMonth) {
      //if(monthFormatDate <0 || monthFormatDate > 12) throw new AppError("Parâmetros Incorretos", 400)

      const users = await userRespository.listAllUsersGroupedByMonth();

      return response.status(200).json(users);
    }
    const users = await userRespository.list();

    return response.status(201).json(users);
  }
}

export { ListUser };
