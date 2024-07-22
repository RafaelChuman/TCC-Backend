import {
  InterfaceIoT,
  DTOCreateIoT,
  DTODeleteIoT,
  DTOUpdateIoT,
} from "./InterfaceIoT";
import { IoT } from "./IoT";
import { PostgresDS } from "@src/data-source";
import { DeleteResult, In } from "typeorm";

export class RepositoryIoT implements InterfaceIoT {
  async create(data: DTOCreateIoT): Promise<IoT | null> {
    const newIoT = new IoT();

    if (data == null) return null;

    newIoT.name = data.name;
    newIoT.Group = data.group;

    return await PostgresDS.manager.save(newIoT);
  }

  async update(data: DTOUpdateIoT): Promise<IoT | null> {
    const updtIoT = await PostgresDS.manager.findOneBy(IoT, {
      id: data.id,
    });

    if (!updtIoT) return null;

    updtIoT.name = data.name;
    updtIoT.Group = data.group;

    return await PostgresDS.manager.save(updtIoT);
  }

  async listIoTByUser(userId: string): Promise<IoT[] | null> {
    const ioTRep = PostgresDS.getRepository(IoT);

    return await ioTRep.find({
      relations: {
        Group: {
          User: true,
        },
      },
      where: {
        Group: {
          User: {
            id: userId,
          },
        },
      },
    });
  }

  async delete(data: DTODeleteIoT): Promise<IoT[]> {
    const ioTRep = PostgresDS.getRepository(IoT);

    return await ioTRep.remove(data.ioT);
  }
}
