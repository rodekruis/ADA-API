const path = require("path");
const NamingStrategy = require("./naming-strategy");

module.exports = {
    type: process.env.MYSQL_TYPE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    ssl:
        process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
    logging: "all",
    logger: "file",
    entities: [path.join(__dirname, "**/!(base).entity.js")],
    migrations: [path.join(__dirname, "migration/*.js")],
    cli: {
        migrationsDir: "migration",
    },
    migrationsRun: true,
    synchronize: false,
    dropSchema: false,
    namingStrategy: new NamingStrategy(),
};
