'use strict';

const tableName = "subjects";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      adminUserId: Sequelize.UUID,
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      displayImage: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      backgroundImage: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
    
    await queryInterface.addConstraint(tableName, {
      fields: ["adminUserId"],
      type: "foreign key",
      name: "fk_admin_user_id",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "cascade",
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(tableName, "fk_admin_user_id");
    await queryInterface.dropTable(tableName);
  }
};
