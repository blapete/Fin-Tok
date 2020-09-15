module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("users", {
    usernameHash: {
      type: DataTypes.STRING(80),
      unique: true,
      allowNull: false,
    },
    emailHash: { type: DataTypes.STRING(80), unique: true, allowNull: false },
    passwordHash: { type: DataTypes.STRING(80), allowNull: false },
    session_id: { type: DataTypes.STRING(80), unique: true },
    history: { type: DataTypes.ARRAY(DataTypes.TEXT) },
  });

  return User;
};
