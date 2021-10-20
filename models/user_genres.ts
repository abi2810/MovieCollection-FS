const user_genre = (sequelize, DataTypes) => {
  const UserGenre = sequelize.define(
    'user_genres',
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

  return UserGenre;
};

module.exports = user_genre;
