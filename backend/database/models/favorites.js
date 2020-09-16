module.exports = function (sequelize, DataTypes) {
  const Favorite = sequelize.define("favorites", {
    usernameHash: {
      type: DataTypes.STRING(80),
      unique: true,
      //   allowNull: false,
    },
    history: { type: DataTypes.ARRAY(DataTypes.TEXT) },
  });

  return Favorite;
};
