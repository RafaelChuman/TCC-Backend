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
  async create(user: User): Promise<InsertResult> {

    console.log(user)

    const resp = await PostgresDS.manager.insert(User, user);

    console.log(resp)
    return resp
  }

  async delete(data: DTODeleteUser): Promise<DeleteResult> {
    return await PostgresDS.manager.delete(User, {
      id: In(data.id),
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

  async findById(id: string): Promise<User | null> {
    const user = await PostgresDS.manager.findOneBy(User, {
      id: id,
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










