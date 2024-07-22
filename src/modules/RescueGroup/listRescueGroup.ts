import { RepositoryRescueGroup } from "@src/entity/RescueGroup/RepositoryRescueGroup";
import { Response, Request } from "express";

class ListRescueGroup {
  async execute(request: Request, response: Response): Promise<Response> {
    const userId = request.headers.userId;
    const groupId = request.query.groupId;

    const rescueGroupRep = new RepositoryRescueGroup();


    if (groupId) {
      if (typeof groupId === "string") {
        const resp = await rescueGroupRep.findByGroup(groupId);
       

        // console.log("resp")
        // console.log(resp)

        return response.status(202).json(resp);
      }

    }

    if (userId) {
      if (typeof userId === "string") {
        const resp = await rescueGroupRep.findByUser(userId);

        return response.status(202).json(resp);
      }
    }

    return response.status(422).json("Unprocessable Entity");
  }
}

export { ListRescueGroup };
