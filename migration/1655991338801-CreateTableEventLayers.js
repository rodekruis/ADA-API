module.exports = class CreateTableEventLayers1655991338801 {
    name = 'CreateTableEventLayers1655991338801'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`event_layers\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`name\` enum ('admin-1', 'admin-2', 'admin-3', 'admin-4', 'admin-5', 'buildings-damage-none', 'buildings-damage-light', 'buildings-damage-moderate', 'buildings-damage-heavy', 'buildings', 'satellite-view', 'people-affected', 'population-density', 'wealth-index', 'damage-admin-1', 'damage-admin-2', 'damage-admin-3', 'damage-admin-4', 'damage-admin-5') NOT NULL DEFAULT 'buildings', \`geojson\` json NOT NULL, \`information\` text NOT NULL, \`event_id\` varchar(36) NULL, UNIQUE INDEX \`REL_391e67aa46a5e1ae24dab0f83f\` (\`event_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event_layers\` ADD CONSTRAINT \`FK_391e67aa46a5e1ae24dab0f83fd\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`event_layers\` DROP FOREIGN KEY \`FK_391e67aa46a5e1ae24dab0f83fd\``);
        await queryRunner.query(`DROP INDEX \`REL_391e67aa46a5e1ae24dab0f83f\` ON \`event_layers\``);
        await queryRunner.query(`DROP TABLE \`event_layers\``);
    }
}
