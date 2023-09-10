import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "schedules"
})
export class Schedule extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column
    subjectId: string;

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