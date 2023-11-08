import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ScheduleUser } from "src/schedule_users/schedule-user.model";
import { Subject } from "src/subject/subject.model";

@Table({
    tableName: "schedules"
})
export class Schedule extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @ForeignKey(() => Subject)
    @Column
    subjectId: string;

    @BelongsTo(() => Subject)
    subject: Subject;

    @HasMany(() => ScheduleUser, "scheduleId")
    users: ScheduleUser[];

    @Column
    name: string;

    @Column
    description: string;

    @Column
    monday: boolean;

    @Column
    tuesday: boolean;

    @Column
    wednesday: boolean;

    @Column
    thursday: boolean;

    @Column
    friday: boolean;

    @Column
    saturday: boolean;

    @Column
    sunday: boolean;

    @Column
    startTime: string;

    @Column
    endTime: string;
}