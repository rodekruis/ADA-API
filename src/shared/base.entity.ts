import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity as TypeOrmBaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
} from "typeorm";

@Entity()
export default abstract class BaseEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn("uuid") id!: string;

    @CreateDateColumn() createdAt!: Date;

    @UpdateDateColumn() updatedAt!: Date;

    @VersionColumn() version!: number;
}

type BaseEntityFieldsName = NonNullable<keyof BaseEntity>;

export const baseEntityFieldsNames: BaseEntityFieldsName[] = [
    "createdAt",
    "updatedAt",
    "version",
    "id",
];
