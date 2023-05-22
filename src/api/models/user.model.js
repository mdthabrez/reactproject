module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_email: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING(25),
      allowNull: false
    },
    staff_id: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    ph_no: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    profile_picture: {
      type: Sequelize.BLOB,
      allowNull: false
    },
    d_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'designation',
        key: 'd_id'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  return User;
};


