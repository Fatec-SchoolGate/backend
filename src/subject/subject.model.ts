import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/auth/models/user.model";
import { OrganizationSubject } from "src/organization_subject/organization_subject.model";
import { OrganizationUser } from "src/organization_users/organization_users.model";
import { Schedule } from "src/schedules/schedule.modal";

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

    @HasOne(() => OrganizationSubject, "subjectId")
    organizationSubject: OrganizationSubject;

    @HasMany(() => Schedule, "subjectId")
    schedules: Schedule[];

    @Column
    description?: string;

    @Column
    displayImage?: string;

    @Column
    backgroundImage?: string;
}