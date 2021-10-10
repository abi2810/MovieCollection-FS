const Genre = require('./genres');

const movie = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'movies',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      genre_id:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      genre_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      release_date:{
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      upvote:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      downvote:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      },
      createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  return Movie;
};

module.exports = movie;
