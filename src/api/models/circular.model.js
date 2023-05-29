module.exports = function(sequelize, Sequelize) {
  return sequelize.define('circular', {
    recipient: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    sender: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    circular_date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    circular_subject: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    ref_no: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    circular_data: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    circular_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    circular_name:{
      type: Sequelize.TEXT,
      allowNull: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'circular',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "circular_pkey",
        unique: true,
        fields: [
          { name: "circular_id" },
        ]
      },
    ]
  });
};
