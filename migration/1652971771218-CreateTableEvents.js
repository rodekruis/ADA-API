const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateTableEvents1652971771218 {
    name = 'CreateTableEvents1652971771218'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`events\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` int NULL, \`country\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`access\` int NOT NULL, \`people_affected\` int NOT NULL, \`buildings_damaged\` int NOT NULL, \`buildings_damaged_percentage\` int NOT NULL, \`admin_level_labels\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`events\``);
    }

}
