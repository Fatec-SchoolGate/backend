'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("organization_subjects", {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true
      },
      organizationId: Sequelize.UUID,
      subjectId: Sequelize.UUID,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });

    await queryInterface.addConstraint("organization_subjects", {
      fields: ["organizationId"],
      type: "foreign key",
      name: "fk_organization_id",
      references: {
        table: "organizations",
        field: "id"
      },
      onDelete: "cascade",
    });

    await queryInterface.addConstraint("organization_subjects", {
      fields: ["subjectId"],
      type: "foreign key",
      name: "fk_subject_id",
      references: {
        table: "subjects",
        field: "id"
      },
      onDelete: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("organization_subjects", "fk_organization_id");
    await queryInterface.removeConstraint("organization_subjects", "fk_subject_id");
    await queryInterface.dropTable("organization_subjects");
  }
};
