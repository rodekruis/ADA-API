import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
} from "typeorm";
import { IsEnum, IsJSON, IsNotEmpty, IsString } from "class-validator";
import BaseEntity, { baseEntityFieldsNames } from "../shared/base.entity";
import EventEntity from "./event.entity";
import EventLayerName from "./event-layer-name.enum";

@Entity()
export default class EventLayerEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: EventLayerId;

    @Column({
        type: "enum",
        enum: EventLayerName,
        default: EventLayerName.Buildings,
    })
    @IsEnum(EventLayerName)
    name!: EventLayerName;

    @OneToOne(() => EventEntity)
    @JoinColumn()
    event!: EventEntity;

    @Column()
    @IsJSON()
    @IsNotEmpty()
    geojson!: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    information!: string;
}

type EventLayerEntityFieldsName = NonNullable<keyof EventLayerEntity>;

export const sortEventLayerEntityFieldsNames: EventLayerEntityFieldsName[] = [
    "name",
    ...baseEntityFieldsNames,
];

export const searchEventLayerEntityFieldsNames: EventLayerEntityFieldsName[] = [
    "id",
    "event",
];

export type EventLayerId = string & { __brand: "EventLayerId" };
