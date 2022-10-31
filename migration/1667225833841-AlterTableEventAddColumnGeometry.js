module.exports = class AlterTableEventAddColumnGeometry1667225833841 {
    name = 'AlterTableEventAddColumnGeometry1667225833841'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` ADD \`geometry\` json NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` DROP COLUMN \`geometry\``);
    }
}
