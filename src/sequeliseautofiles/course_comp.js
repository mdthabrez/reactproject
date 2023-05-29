const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course_comp', {
    certificate_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    certificate_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    student_name: {
      type: DataTypes.STRING(30),
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
    pdf_data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course_comp',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "course_comp_pkey",
        unique: true,
        fields: [
          { name: "certificate_id" },
        ]
      },
    ]
  });
};
