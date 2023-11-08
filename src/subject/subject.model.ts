import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/auth/models/user.model";

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

    @ForeignKey(() => User)
    @Column
    adminUserId: string;

    @BelongsTo(() => User)
    admin: User;

    @Column
    description?: string;

    @Column
    displayImage?: string;

    @Column
    backgroundImage?: string;
}