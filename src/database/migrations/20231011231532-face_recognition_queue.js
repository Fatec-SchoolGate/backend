'use strict';

const tableName = "face_recognition_queues";

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
      name: "fk_schedule_id",
      references: {
        table: "schedules",
        field: "id"
      },
      onDelete: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(tableName, "fk_schedule_id");
    await queryInterface.dropTable(tableName);
  }
};
