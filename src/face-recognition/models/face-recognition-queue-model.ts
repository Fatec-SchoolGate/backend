import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Schedule } from "src/schedules/schedule.modal";
import { FaceRecognitionQueuePhoto } from "./face-recognition-queue-photo";

type Attributes = {
    id: string;
    scheduleId: string;
}

type CreateAttributes = Omit<Attributes, "id">;

@Table({
    tableName: "face_recognition_queues"
})
export class FaceRecognitionQueue extends Model<Attributes, CreateAttributes> {
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

    @HasMany(() => FaceRecognitionQueuePhoto, "faceRecognitionQueueId")
    photos: FaceRecognitionQueuePhoto[];
}