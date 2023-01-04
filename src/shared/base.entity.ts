import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity as TypeOrmBaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';

type BaseEntityFieldsName = NonNullable<keyof BaseEntity>;

export const baseEntityFieldsNames: BaseEntityFieldsName[] = [
    'createdAt',
    'updatedAt',
    'version',
    'id',
];

@Entity()
export default abstract class BaseEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn('uuid') id!: string;

    @CreateDateColumn() createdAt!: Date;

    @UpdateDateColumn() updatedAt!: Date;

    @VersionColumn() version!: number;

    @BeforeInsert()
    @BeforeUpdate()
    async removeBaseFields() {
        // the database will populate these fields correctly
        // if these fields are specified the values override the database
        baseEntityFieldsNames.forEach(
            (baseEntityFieldsName) => delete this[baseEntityFieldsName],
        );
    }
}
