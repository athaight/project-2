const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
<<<<<<< HEAD
    
=======
>>>>>>> 0b809fded12c832140bc64e9559f6c7a20f820db
  }
);

module.exports = sequelize;
