module.exports = class CreateTableEventCodes1653572903283 {
    name = 'CreateTableEventCodes1653572903283'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`event_codes\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`accessed_at\` datetime NULL, \`event_id\` varchar(36) NULL, UNIQUE INDEX \`REL_863e8b745d1f07767bcce34b38\` (\`event_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event_codes\` ADD CONSTRAINT \`FK_863e8b745d1f07767bcce34b38d\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`event_codes\` DROP FOREIGN KEY \`FK_863e8b745d1f07767bcce34b38d\``);
        await queryRunner.query(`DROP INDEX \`REL_863e8b745d1f07767bcce34b38\` ON \`event_codes\``);
        await queryRunner.query(`DROP TABLE \`event_codes\``);
    }

}
