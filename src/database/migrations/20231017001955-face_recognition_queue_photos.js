'use strict';

const tableName = "face_recognition_queue_photos";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true
      },
      faceRecognitionQueueId: Sequelize.UUID,
      imagePath: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });

    await queryInterface.addConstraint(tableName, {
      fields: ["faceRecognitionQueueId"],
      type: "foreign key",
      name: "fk_face_recognition_queues_id",
      references: {
        table: "face_recognition_queues",
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
    await queryInterface.removeConstraint(tableName, "fk_face_recognition_queues_id");
    await queryInterface.dropTable(tableName);
  }
};
