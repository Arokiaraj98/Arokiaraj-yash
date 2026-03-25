import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { RefreshToken } from "../models/RefreshToken";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "ecommerce.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, RefreshToken],
});
