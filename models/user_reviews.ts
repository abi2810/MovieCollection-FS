const user_review = (sequelize, DataTypes) => {
  const UserReview = sequelize.define(
    'user_reviews',
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
      movie_id:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reviews:{
        type: DataTypes.STRING,
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

  return UserReview;
};

module.exports = user_review;
