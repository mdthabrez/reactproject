const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bonafide', {
    bonafide_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    student_regis: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    student_dept: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    student_branch: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    student_year: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    date_of_issue: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    purpose: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pdf_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pdf_name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bonafide',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bonafide_pkey",
        unique: true,
        fields: [
          { name: "bonafide_id" },
        ]
      },
    ]
  });
};
