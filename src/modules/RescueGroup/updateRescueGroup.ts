import { DTOUpdateRescueGroup } from "@src/entity/Item/InterfaceItem";
import { RepositoryRescueGroup } from "@src/entity/Item/RepositoryRescueGroup";
import { Response, Request, response } from "express";

class UpdateRescueGroup {
  async execute(request: Request, response: Response): Promise<Response> {
    const data: DTOUpdateRescueGroup = {
      group: request.body.group,
      users: request.body.users,
    };

    const rescueGroupRep = new RepositoryRescueGroup();

    const resp = await rescueGroupRep.updateByGroup(data);

    return response.status(200).json(resp);
  }
}

export { UpdateRescueGroup };
