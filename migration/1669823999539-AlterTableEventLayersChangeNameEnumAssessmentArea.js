module.exports = class AlterTableEventLayersChangeNameEnumAssessmentArea1669823999539 {
    name = 'AlterTableEventLayersChangeNameEnumAssessmentArea1669823999539'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`event_layers\` CHANGE \`name\` \`name\` enum ('admin-1', 'admin-2', 'admin-3', 'admin-4', 'admin-5', 'buildings-damage-none', 'buildings-damage-light', 'buildings-damage-moderate', 'buildings-damage-heavy', 'buildings', 'assessment-area', 'people-affected', 'population-density', 'wealth-index', 'damage-admin-1', 'damage-admin-2', 'damage-admin-3', 'damage-admin-4', 'damage-admin-5') NOT NULL DEFAULT 'buildings'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`event_layers\` CHANGE \`name\` \`name\` enum ('admin-1', 'admin-2', 'admin-3', 'admin-4', 'admin-5', 'buildings-damage-none', 'buildings-damage-light', 'buildings-damage-moderate', 'buildings-damage-heavy', 'buildings', 'satellite-view', 'people-affected', 'population-density', 'wealth-index', 'damage-admin-1', 'damage-admin-2', 'damage-admin-3', 'damage-admin-4', 'damage-admin-5') NOT NULL DEFAULT 'buildings'`);
    }
}
