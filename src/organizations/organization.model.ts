import { HasManyGetAssociationsMixin, NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { OrganizationSubject } from "src/organization_subject/organization_subject.model";
import { OrganizationUser } from "src/organization_users/organization_users.model";

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

    @HasMany(() => OrganizationUser, "organizationId")
    organizationUsers: OrganizationUser[];

    @HasMany(() => OrganizationSubject, "organizationId")
    organizationSubjects: OrganizationSubject[];
}