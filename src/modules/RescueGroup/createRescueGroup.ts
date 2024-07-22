import { DTOCreateRescueGroup} from "@src/entity/RescueGroup/InterfaceRescueGroup";
import { RepositoryRescueGroup } from "@src/entity/RescueGroup/RepositoryRescueGroup";
import {Request, Response} from "express";

class CreateRescueGroup{

    async execute(request: Request, response: Response): Promise<Response> {

        const data: DTOCreateRescueGroup = {
            group: request.body.group,
            users: request.body.users
        };

        const rescueGroupRep = new RepositoryRescueGroup();

        // console.log("data")
        // console.log(data)
        const resp = await rescueGroupRep.create(data);

        return response.status(200).json(resp);
    }


}

export {CreateRescueGroup}