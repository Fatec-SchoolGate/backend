import { BeforeCreate, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import * as bcrypt from "bcryptjs";

@Table({
    tableName: "users"
})
export class User extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    profileImage: string;

    @BeforeCreate
    static async hashPassword(user) {
        user.password = await bcrypt.hash(user.password, 10);
    }
}