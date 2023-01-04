import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { snakeCase } from 'typeorm/util/StringUtils';

class NamingStrategy extends SnakeNamingStrategy {
    tableName = (tableName: string, customName: string) => {
        const tableNameSplit = snakeCase(tableName).split('_');
        tableNameSplit.pop();
        return customName || `${tableNameSplit.join('_')}s`;
    };
}

export default NamingStrategy;
