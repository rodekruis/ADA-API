module.exports = class AlterTableEventsAddColumnPeopleAffectedPercentage1677082706561 {
    name = 'AlterTableEventsAddColumnPeopleAffectedPercentage1677082706561'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` ADD \`people_affected_percentage\` float NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` DROP COLUMN \`people_affected_percentage\``);
    }
}
