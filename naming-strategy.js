const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const { snakeCase } = require("typeorm/util/StringUtils");

class NamingStrategy extends SnakeNamingStrategy {
    tableName = (tableName, customName) => {
        const tableNameSplit = snakeCase(tableName).split("_");
        tableNameSplit.pop();
        return customName || `${tableNameSplit.join("_")}s`;
    };
}

module.exports = NamingStrategy;
