module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "thabrez",
    DB: "dist",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};