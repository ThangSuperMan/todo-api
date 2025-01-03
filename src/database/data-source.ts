import * as dotenv from "dotenv";

import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ["src/database/migrations/*.{js,ts}"],
  logging: Boolean(process.env.ORM_LOGGING) === true,
  entities: ["src/entities/*.{js,ts}"],
  synchronize: false,
  subscribers: [],
});
