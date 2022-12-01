module.exports = class AlterTableEventChangeAccessEnumRestricted1669823768093 {
    name = 'AlterTableEventChangeAccessEnumRestricted1669823768093'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`access\` \`access\` enum ('Restricted', 'Public') NOT NULL DEFAULT 'Public'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`access\` \`access\` enum ('Private', 'Public') NOT NULL DEFAULT 'Public'`);
    }
}
