import { DataSource } from "typeorm";
import { User } from "./entity/User/User";
import { Car } from "./entity/Car/Car";
import { Item } from "./entity/Item/Item";
import { Orders } from "./entity/Orders/Orders";
import { OrderAndItems } from "./entity/OrderAndItems/OrderAndItems";

export const PostgresDS = new DataSource({
  type: "postgres",
  // host: "127.0.0.1",
   port: 5432,
   username: "postgres",
   password: "tcc_univesp!",
  // database: "postgres",
  //ssl: false,
  name: "default",
  //host:'ep-fragrant-hill-48885740.us-east-2.aws.neon.tech',
  database:'postgres',
  //username:'rafael.chuman',
  //password:'rJH3kb4BsFzi',
  //ENDPOINT_ID='ep-fragrant-hill-48885740'
  // ssl: true,
  //  extra: {
  //    ssl: {
  //      rejectUnauthorized: false,
  //    },
  //  },  
  entities: [
    User,
    Car,
    Item,
    Orders,
    OrderAndItems
  ],
  migrations: ["./src/migration/*.m.ts"],
});

PostgresDS.initialize()
  .then(() => {
    console.log(PostgresDS.options.migrations);
    console.log(PostgresDS.migrations.length);

    console.log("Database Initialized");
  })
  .catch((error: string) => console.log(error));
