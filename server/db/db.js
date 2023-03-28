// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   port: process.env.PGPORT
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// }

const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB Connected")
  } catch(error) {
    console.log("Unable to connect to MongoDB")
    console.log(error)
  }
};