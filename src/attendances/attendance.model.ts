import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/auth/models/user.model";
import { Schedule } from "src/schedules/schedule.modal";

@Table({
    tableName: "attendances"
})
export class Attendance extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Schedule)
    @Column
    scheduleId: string;

    @BelongsTo(() => Schedule)
    schedule: Schedule;

    @Column(DataType.ENUM("qrcode", "face_recognition"))
    authMode: string;

    @Column
    attendanceDate: Date;

    @Column
    weekDayIndex: number;
}