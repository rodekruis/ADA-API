import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity as TypeOrmBaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
} from "typeorm";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";

@Entity()
export default abstract class BaseEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn("uuid") id!: string;

    @CreateDateColumn() createdAt!: Date;

    @UpdateDateColumn() updatedAt!: Date;

    @VersionColumn() version!: number;
}

type BaseEntityFieldsName = NonNullable<EntityFieldsNames<BaseEntity>>;

export const sortBaseEntityFieldsNames: BaseEntityFieldsName[] = [
    "createdAt",
    "updatedAt",
    "version",
    "id",
];

export const searchBaseEntityFieldsNames: BaseEntityFieldsName[] = [];
