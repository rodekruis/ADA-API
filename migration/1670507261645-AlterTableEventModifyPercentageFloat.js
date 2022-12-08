module.exports = class AlterTableEventModifyPercentageFloat1670507261645 {
    name = 'AlterTableEventModifyPercentageFloat1670507261645'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` MODIFY \`buildings_damaged_percentage\` float NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` MODIFY \`buildings_damaged_percentage\` int NOT NULL`);
    }
}
