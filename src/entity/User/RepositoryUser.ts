import { PostgresDS } from "@src/data-source";
import {
  DTOCreateUser,
  DTODeleteUser,
  DTOUpdateUser,
  InterfaceUser,
} from "./InterfaceUser";
import { User } from "./User";
import { DeleteResult, In } from "typeorm";

class RepositoryUser implements InterfaceUser {
  async create(data: DTOCreateUser): Promise<User> {
    const user = new User();

    user.name = data.name;
    user.userName = data.userName;
    user.password = data.password;
    user.isAdmin = data.isAdmin;
    user.imgPath = data.imgPath;
    user.email = data.email;
    user.celular = data.celular;
    user.telegram = data.telegram;

    await PostgresDS.manager.save(user);

    return user;
  }

  async delete(data: DTODeleteUser): Promise<DeleteResult> {
    return await PostgresDS.manager.delete(User, {
      id: In(data.ids),
    });
  }

  async list(): Promise<User[]> {
    const users = await PostgresDS.manager.find(User);

    return users;
  }

  async listAllUsersGroupedByMonth(): Promise<User[]> {
    const query = PostgresDS.manager
      .createQueryBuilder(User, "Users")
      .select(`count(id), DATE_TRUNC('month', "createdAt")`)
      .where(`date_part('year', "createdAt") = date_part('year', CURRENT_DATE)`)
      .groupBy(`DATE_TRUNC('month', "createdAt")`);

    const users = await query.execute();

    return users;
  }

  async findByUserName(userNameParm: string): Promise<User | null> {
    const user = await PostgresDS.manager.findOneBy(User, {
      userName: userNameParm,
    });

    return user;
  }

  async findById(IdParm: string): Promise<User | null> {
    const user = await PostgresDS.manager.findOneBy(User, {
      id: IdParm,
    });

    return user;
  }

  async update(user: DTOUpdateUser): Promise<User | null> {
    const updtUser = await PostgresDS.manager.findOneBy(User, {
      id: user.id,
    });

    if (!updtUser) return null;

    updtUser.name = user.name;

    updtUser.isAdmin = user.isAdmin;
    updtUser.imgPath = user.imgPath;
    updtUser.email = user.email;
    updtUser.celular = user.celular;
    updtUser.telegram = user.telegram;

    if (user.password) updtUser.password = user.password;

    await PostgresDS.manager.save(User, updtUser);

    return updtUser;
  }
}

export { RepositoryUser };
