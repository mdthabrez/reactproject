
module.exports = function(sequelize, Sequelize ) {
  return sequelize.define('remainders', {
    r_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    remainder: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    remainder_deadline: {
      type: Sequelize.DATE,
      allowNull: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    circular_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'circular',
        key: 'circular_id'
      }
    }
  }, {
    sequelize,
    tableName: 'remainders',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "remainders_pkey",
        unique: true,
        fields: [
          { name: "r_id" },
        ]
      },
    ]
  });
};
