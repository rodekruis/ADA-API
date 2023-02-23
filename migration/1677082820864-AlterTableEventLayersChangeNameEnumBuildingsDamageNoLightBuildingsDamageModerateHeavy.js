module.exports = class AlterTableEventLayersChangeNameEnumBuildingsDamageNoLightBuildingsDamageModerateHeavy1677082820864 {
    name = 'AlterTableEventLayersChangeNameEnumBuildingsDamageNoLightBuildingsDamageModerateHeavy1677082820864'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`event_layers\` CHANGE \`name\` \`name\` enum ('admin-1', 'admin-2', 'admin-3', 'admin-4', 'admin-5', 'buildings-damage-none', 'buildings-damage-light', 'buildings-damage-moderate', 'buildings-damage-heavy', 'buildings-damage-none-and-light', 'buildings-damage-moderate-and-heavy', 'buildings', 'assessment-area', 'population-density', 'wealth-index') NOT NULL DEFAULT 'buildings'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`event_layers\` CHANGE \`name\` \`name\` enum ('admin-1', 'admin-2', 'admin-3', 'admin-4', 'admin-5', 'buildings-damage-none', 'buildings-damage-light', 'buildings-damage-moderate', 'buildings-damage-heavy', 'buildings', 'assessment-area', 'population-density', 'wealth-index') NOT NULL DEFAULT 'buildings'`);
    }
}
