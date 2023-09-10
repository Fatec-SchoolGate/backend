'use strict';

const tableName = "schedules";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true
      },
      subjectId: Sequelize.UUID,
      name: Sequelize.STRING,
      description: Sequelize.TEXT,
      monday: Sequelize.BOOLEAN,
      tuesday: Sequelize.BOOLEAN,
      wednesday: Sequelize.BOOLEAN,
      thursday: Sequelize.BOOLEAN,
      friday: Sequelize.BOOLEAN,
      saturday: Sequelize.BOOLEAN,
      sunday: Sequelize.BOOLEAN,
      startTime: Sequelize.TIME,
      endTime: Sequelize.TIME,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });

    await queryInterface.addConstraint(tableName, {
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(tableName, "fk_subject_id");
    await queryInterface.dropTable(tableName);
  }
};
