import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Schedule } from "src/schedules/schedule.modal";
import { FaceRecognitionQueue } from "./face-recognition-queue-model";

type Attributes = {
    id: string;
    faceRecognitionQueueId: string;
    imagePath: string;
}

type CreateAttributes = Omit<Attributes, "id">;

@Table({
    tableName: "face_recognition_queue_photos"
})
export class FaceRecognitionQueuePhoto extends Model<Attributes, CreateAttributes> {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @Column
    imagePath: string;

    @ForeignKey(() => FaceRecognitionQueue)
    @Column
    faceRecognitionQueueId: string;

    faceRecognitionQueue: FaceRecognitionQueue;
}