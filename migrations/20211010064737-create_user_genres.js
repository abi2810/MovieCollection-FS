'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
  'user_genres',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      genre_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'genres',
          key:'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      is_active:{
        type: Sequelize.BOOLEAN(4),
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        // defaultValue: Model.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        // defaultValue: Model.literal('CURRENT_TIMESTAMP')
      },
    },
    {
      engine: 'InnoDB', // default: 'InnoDB'
      charset: 'utf8mb4' // default: null
    }
  )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
