module.exports = class AlterTableEventLayersChangeNameEnumBuildingDamagePeopleAffected1674660631337 {
    name = 'AlterTableEventLayersChangeNameEnumBuildingDamagePeopleAffected1674660631337'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`event_layers\` CHANGE \`name\` \`name\` enum ('admin-1', 'admin-2', 'admin-3', 'admin-4', 'admin-5', 'buildings-damage-none', 'buildings-damage-light', 'buildings-damage-moderate', 'buildings-damage-heavy', 'buildings', 'assessment-area', 'population-density', 'wealth-index') NOT NULL DEFAULT 'buildings'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`event_layers\` CHANGE \`name\` \`name\` enum ('admin-1', 'admin-2', 'admin-3', 'admin-4', 'admin-5', 'buildings-damage-none', 'buildings-damage-light', 'buildings-damage-moderate', 'buildings-damage-heavy', 'buildings', 'assessment-area', 'people-affected', 'population-density', 'wealth-index', 'damage-admin-1', 'damage-admin-2', 'damage-admin-3', 'damage-admin-4', 'damage-admin-5') NOT NULL DEFAULT 'buildings'`);
    }
}
