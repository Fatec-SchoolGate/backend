import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "organization_subjects"
})
export class OrganizationSubject extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @Column
    organizationId: string;

    @Column
    subjectId: string;
}