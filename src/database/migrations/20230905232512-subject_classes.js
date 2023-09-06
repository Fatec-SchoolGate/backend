'use strict';

const tableName = "classes";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true
      },
      subjectId: Sequelize.UUID,
      name: Sequelize.STRING,
      description: Sequelize.TEXT,
      monday: Sequelize.BOOL,
      tuesday: Sequelize.BOOL,
      wednesday: Sequelize.BOOL,
      thursday: Sequelize.BOOL,
      friday: Sequelize.BOOL,
      saturday: Sequelize.BOOL,
      sunday: Sequelize.BOOL,
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
    await queryInterface.dropTable(tableName);
  }
};
