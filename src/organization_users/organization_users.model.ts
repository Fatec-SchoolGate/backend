import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/auth/models/user.model";
import { Organization } from "src/organizations/organization.model";

@Table({
    tableName: "organization_users"
})
export class OrganizationUser extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @ForeignKey(() => Organization)
    @Column(DataType.UUIDV4)
    organizationId: string;

    @BelongsTo(() => Organization)
    organization: Organization;

    @ForeignKey(() => User)
    @Column(DataType.UUIDV4)
    userId: string;

    @BelongsTo(() => User)
    user: User;
    
    @Column(DataType.ENUM({ values: ["owner", "manager", "member"] }))
    role: string;

}

//probably not the best place to put this hehe
export type UserRoles = "owner" | "manager" | "member";