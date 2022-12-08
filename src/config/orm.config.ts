import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import NamingStrategy from "./naming-strategy";

export const ormConfig: DataSourceOptions = {
    type: process.env.MYSQL_TYPE as "mysql" | "mariadb",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    ssl:
        process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
    logging: "all",
    logger: "file",
    entities: [path.join(__dirname, "../**/!(base).entity.js")],
    migrations: [path.join(__dirname, "../../migration/*.js")],
    migrationsRun: true,
    synchronize: false,
    dropSchema: false,
    namingStrategy: new NamingStrategy(),
};

const dataSource = new DataSource(ormConfig);
dataSource.initialize();

export default dataSource;
