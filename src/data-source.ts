import { DataSource } from "typeorm";
import { User } from "./entity/User/User";
import { RescueGroup } from "./entity/RescueGroup/RescueGroup";
import { IoT } from "./entity/IoT/IoT";
import { Group } from "./entity/Group/Group";
import { IoTMonitor } from "./entity/IoTMonitor/IoTMonitor";

export const PostgresDS = new DataSource({
  type: "postgres",
  // host: "127.0.0.1",
   port: 5432,
  // username: "chuman",
  // password: "pji510_univesp!",
  // database: "postgres",
  //ssl: false,
  name: "default",
  host:'ep-fragrant-hill-48885740.us-east-2.aws.neon.tech',
  database:'pji510',
  username:'rafael.chuman',
  password:'rJH3kb4BsFzi',
  //ENDPOINT_ID='ep-fragrant-hill-48885740'
  ssl: true,
   extra: {
     ssl: {
       rejectUnauthorized: false,
     },
   },  
  entities: [
    User,
    Group,
    RescueGroup,
    IoT,
    IoTMonitor
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
