import { DTODeleteRescueGroup } from "@src/entity/Item/InterfaceItem";
import { RepositoryRescueGroup } from "@src/entity/Item/RepositoryRescueGroup";
import { Response, Request } from "express";

class DeleteRescueGroup {
  async execute(request: Request, response: Response): Promise<Response> {
    const data: DTODeleteRescueGroup = {
      ids: request.body.ids,
    };

    if (data.ids.length > 0) {
      if (typeof data.ids[0] === "string") {
        const rescueGroupRep = new RepositoryRescueGroup();

        console.log("data")
        console.log(data)

        const resp = await rescueGroupRep.delete(data);

        return response.status(200).json(resp);
      }
    }
    return response.status(200).json("Database not modified.");
  }
}

export { DeleteRescueGroup };
