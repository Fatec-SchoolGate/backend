import { Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({
    tableName: "organizations"
})
export class Organization extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Unique
    @Column
    code: string;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    address: string;
}