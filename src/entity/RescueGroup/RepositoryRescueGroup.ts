import { PostgresDS } from "@src/data-source";
import {
  InterfaceRescueGroup,
  DTOCreateRescueGroup,
  DTODeleteRescueGroup,
  DTOUpdateRescueGroup,
} from "./InterfaceRescueGroup";
import { DeleteResult, In, InsertResult, UpdateResult } from "typeorm";
import { RescueGroup } from "./RescueGroup";
import { Group } from "../Group/Group";

class RepositoryRescueGroup implements InterfaceRescueGroup {
  async create(data: DTOCreateRescueGroup): Promise<InsertResult> {
    // const queryBuilder = PostgresDS.createQueryBuilder(
    //   RescueGroup,
    //   "RescueGroup"
    // );
    const rescueGroups: RescueGroup[] = [];

    data.users.forEach((user) => {
      const rescueGroup = new RescueGroup();
      rescueGroup.Group = data.group;
      rescueGroup.User = user;

      rescueGroups.push(rescueGroup);
    });

    const resp = await PostgresDS.manager.insert(RescueGroup, rescueGroups);

    return resp;
    // console.log("queryBuilder")
    // console.log(queryBuilder)

    // return await queryBuilder.execute();
  }

  async findByUser(idUser: string): Promise<RescueGroup[] | null> {
    const rescueGroup = PostgresDS.manager.getRepository(RescueGroup);
    return await rescueGroup.find({
      relations: {
        Group: true,
        User: true,
      },
      where: {
        User: {
          id: idUser,
        },
      },
    });
  }

  async findByGroup(groupId: string): Promise<RescueGroup[] | null> {
    const rescueGroup = PostgresDS.manager.getRepository(RescueGroup);
    return await rescueGroup.find({
      relations: {
        Group: true,
        User: true,
      },
      where: {
        Group: {
          id: groupId,
        },
      },
    });
  }

  async delete(data: DTODeleteRescueGroup): Promise<DeleteResult> {
    const collaborator = await PostgresDS.manager.delete(RescueGroup, {
      id: In(data.ids),
    });

    console.log("collaborator")
    console.log(collaborator)
    return collaborator;
  }

  async deleteByGroup(data: DTODeleteRescueGroup): Promise<DeleteResult> {
    const collaborator = await PostgresDS.manager.delete(RescueGroup, {
      Group: { id: In(data.ids) },
    });

    return collaborator;
  }

  async updateByGroup(data: DTOUpdateRescueGroup): Promise<InsertResult> {
    this.deleteByGroup({ ids: [data.group.id] });

    return this.create({ group: data.group, users: data.users});
  }
}

export { RepositoryRescueGroup };
