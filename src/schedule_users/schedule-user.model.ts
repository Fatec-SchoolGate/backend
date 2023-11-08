import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/auth/models/user.model";
import { Schedule } from "src/schedules/schedule.modal";

@Table({
    tableName: "schedule_users"
})
export class ScheduleUser extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @ForeignKey(() => Schedule)
    @Column
    scheduleId: string;

    @BelongsTo(() => Schedule)
    schedule: Schedule;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @BelongsTo(() => User)
    user: User;
}