'use strict';

const tableName = "attendances";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true
      },
      userId: Sequelize.UUID,
      scheduleId: Sequelize.UUID,
      authMode: Sequelize.ENUM("qrcode", "face_recognition", "manual"),
      attendanceDate: Sequelize.DATE,
      weekDayIndex: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
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
    await queryInterface.removeConstraint(tableName, "fk_schedule_id");
    await queryInterface.removeConstraint(tableName, "fk_user_id");
    await queryInterface.dropTable(tableName);
  }
};
