import { PostgresDS } from "@src/data-source";
import {
  DTOCreateUser,
  DTODeleteUser,
  DTOUpdateUser,
  InterfaceUser,
} from "./InterfaceUser";
import { User } from "./User";
import { DeleteResult, In, InsertResult } from "typeorm";

class RepositoryUser implements InterfaceUser {
  async create(user: User): Promise<InsertResult | null> {

    try {
      console.log(`create " + ${JSON.stringify(user)}`)

      const resp = await PostgresDS.manager.insert(User, user);
      return resp
    }
    catch (e) {
      console.log(`RepositoryUser - create Error: ${JSON.stringify(e)}`)
    }
    return null;
  }

  async delete(data: DTODeleteUser): Promise<DeleteResult | null> {
    try {
      return await PostgresDS.manager.delete(User, {
        id: In(data.id),
      });
    }
    catch (e) {
      console.log(`RepositoryUser - delete Error: ${JSON.stringify(e)}`)
    }
    return null;
  }

  async list(): Promise<User[]> {
    const users = await PostgresDS.manager.find(User);

    return users;
  }

  async listAllUsersGroupedByMonth(): Promise<User[] | null> {
    try {
      const query = PostgresDS.manager
        .createQueryBuilder(User, "Users")
        .select(`count(id), DATE_TRUNC('month', "createdAt")`)
        .where(`date_part('year', "createdAt") = date_part('year', CURRENT_DATE)`)
        .groupBy(`DATE_TRUNC('month', "createdAt")`);

      const users = await query.execute();

      return users;
    }
    catch (e) {
      console.log(`RepositoryUser - listAllUsersGroupedByMonth Error: ${JSON.stringify(e)}`)
    }
    return null;
  }

  async findByUserName(userNameParm: string): Promise<User | null> {
    try {
      const user = await PostgresDS.manager.findOneBy(User, {
        userName: userNameParm,
      });

      return user;
    }
    catch (e) {
      console.log(`RepositoryUser - findByUserName Error: ${JSON.stringify(e)}`)
    }
    return null;

  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await PostgresDS.manager.findOneBy(User, {
        id: id,
      });

      return user;
    }
    catch (e) {
      console.log(`RepositoryUser - findById Error: ${JSON.stringify(e)}`)
    }
    return null;
  }

  async update(user: User): Promise<User | null> {
    try {
      const updtUser = await PostgresDS.manager.findOneBy(User, {
        id: user.id,
      });

      if (!updtUser) return null;

      updtUser.name = user.name
      updtUser.userName = user.userName
      updtUser.imgPath = user.imgPath
      updtUser.email = user.email
      updtUser.cellphone = user.cellphone
      updtUser.telegram = user.telegram
      updtUser.isAdmin = user.isAdmin

      updtUser.deleted = false
      updtUser.updated = user.updated

      if (user.password) updtUser.password = user.password;

      return await PostgresDS.manager.save(User, updtUser);
    }

    catch (e) {
      console.log(`RepositoryUser - update Error: ${JSON.stringify(e)}`)
    }
    return null;
  }
}
export { RepositoryUser };










