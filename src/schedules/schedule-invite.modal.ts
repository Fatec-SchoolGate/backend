import { BelongsTo, Column, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Schedule } from "./schedule.modal";

type TScheduleInvite = {
    id: string;
    scheduleId: string;
}

type CScheduleInvite = Omit<TScheduleInvite, "id">;

@Table({
    tableName: "schedule_invites"
})
export class ScheduleInvite extends Model<TScheduleInvite, CScheduleInvite> {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @ForeignKey(() => Schedule)
    @Column
    scheduleId: string;

    @BelongsTo(() => Schedule)
    declare schedule: Schedule;

    @DeletedAt
    declare deletedAt: Date | null;
}