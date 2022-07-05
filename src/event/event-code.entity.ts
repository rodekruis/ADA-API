import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";
import { IsDate, IsJWT, IsNotEmpty, IsOptional } from "class-validator";
import argon2 from "argon2";
import BaseEntity, { baseEntityFieldsNames } from "../shared/base.entity";
import EventEntity from "./event.entity";

@Entity()
export default class EventCodeEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: EventCodeId;

    @OneToOne(() => EventEntity, { onDelete: "CASCADE" })
    @JoinColumn()
    event!: EventEntity;

    @Column()
    @IsJWT()
    @IsNotEmpty()
    code!: string;

    @Column({ nullable: true, default: null })
    @IsOptional()
    @IsDate()
    accessedAt?: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashCode() {
        this.code = await argon2.hash(this.code);
    }
}

type EventCodeEntityFieldsName = NonNullable<keyof EventCodeEntity>;

export const sortEventCodeEntityFieldsNames: EventCodeEntityFieldsName[] = [
    "accessedAt",
    ...baseEntityFieldsNames,
];

export const searchEventCodeEntityFieldsNames: EventCodeEntityFieldsName[] = [
    "id",
    "event",
];

export type EventCodeId = string & { __brand: "EventCodeId" };
