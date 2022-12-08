module.exports = class AlterTableEventChangeTypeEnum1670514231267 {
    name = 'AlterTableEventChangeTypeEnum1670514231267'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`events\` ADD \`type\` enum ('Tropical Cyclone', 'Conflict', 'Eruption', 'Earthquake', 'Fire', 'Flood', 'Heavy Rain', 'Landslide', 'Tsunami') NOT NULL DEFAULT 'Earthquake' AFTER \`name\``);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`events\` ADD \`type\` enum ('Hurricane', 'Eruption', 'Storm', 'Explosion', 'Typhoon') NOT NULL DEFAULT 'Hurricane' AFTER \`name\``);
    }
}
