'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("organization_users", {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true
      },
      organizationId: Sequelize.UUID,
      userId: Sequelize.UUID,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });

    await queryInterface.addConstraint("organization_users", {
      fields: ["organizationId"],
      type: "foreign key",
      name: "fk_organization_id",
      references: {
        table: "organizations",
        field: "id"
      },
      onDelete: "cascade",
    });

    await queryInterface.addConstraint("organization_users", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk_user_id",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("organization_users", "fk_organization_id");
    await queryInterface.removeConstraint("organization_users", "fk_user_id");
    await queryInterface.dropTable("organization_users");
  }
};
