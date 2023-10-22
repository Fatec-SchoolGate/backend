'use strict';

const tableName = "schedule_users";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true
      },
      scheduleId: Sequelize.UUID,
      userId: Sequelize.UUID,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });

    await queryInterface.addConstraint(tableName, {
      fields: ["scheduleId"],
      type: "foreign key",
      name: "schedule_id",
      references: {
        table: "schedules",
        field: "id"
      },
      onDelete: "cascade",
    });

    await queryInterface.addConstraint(tableName, {
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
    await queryInterface.removeConstraint(tableName, "schedule_id");
    await queryInterface.removeConstraint(tableName, "fk_user_id");
    await queryInterface.dropTable(tableName);
  }
};
