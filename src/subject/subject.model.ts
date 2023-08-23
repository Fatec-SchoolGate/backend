import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "subjects"
})
export class Subject extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column
    name: string;

    @Column
    description?: string;

    @Column
    displayImage?: string;

    @Column
    backgroundImage?: string;
}