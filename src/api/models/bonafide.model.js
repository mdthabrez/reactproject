
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('bonafide', {
    bonafide_id: {
      autoIncrement: true,
      type:Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    student_regis: {
      type: Sequelize.STRING,
      allowNull: true
    },
    student_dept: {
      type: Sequelize.STRING,
      allowNull: true
    },
    student_branch: {
      type:Sequelize.STRING,
      allowNull: true
    },
    student_year: {
      type: Sequelize.STRING,
      allowNull: true
    },
    date_of_issue: {
      type:Sequelize.DATE,
      allowNull: true
    },
    purpose: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pdf_data: {
      type: Sequelize.STRING,
      allowNull :false
    },
    pdf_name: {
      type: Sequelize.STRING,
      allowNull :false
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
