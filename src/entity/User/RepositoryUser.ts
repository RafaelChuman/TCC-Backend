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
  async create(data: DTOCreateUser): Promise<InsertResult> {
    const user = new User();

    user.name= data.name
    user.userName= data.userName
    user.password= data.password
    user.imgPath= data.imgPath
    user.email= data.email
    user.cellphone= data.cellphone
    user.telegram= data.telegram
    user.isAdmin= data.isAdmin

    return await PostgresDS.manager.insert(User, user);
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

  async update(user: DTOUpdateUser): Promise<InsertResult | null> {
    const updtUser = await PostgresDS.manager.findOneBy(User, {
      id: user.id,
    });

    if (!updtUser) return null;


    updtUser.name= user.name
    updtUser.userName= user.userName
    updtUser.password= user.password
    updtUser.imgPath= user.imgPath
    updtUser.email= user.email
    updtUser.cellphone= user.cellphone
    updtUser.telegram= user.telegram
    updtUser.isAdmin= user.isAdmin

    updtUser.deleted = false
    updtUser.updated = new Date(Date.now())

    if (user.password) updtUser.password = user.password;

    return await PostgresDS.manager.insert(User, updtUser);
  }
}

export { RepositoryUser };
