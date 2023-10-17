import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Schedule } from "src/schedules/schedule.modal";

@Table({
    tableName: "face_recognition_queues"
})
export class FaceRecognitionQueue extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @ForeignKey(() => Schedule)
    @Column
    scheduleId: string;

    @BelongsTo(() => Schedule)
    schedule: Schedule;
}