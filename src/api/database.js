import mysql from "mysql2";

export const connectToDb = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "sogaz",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the MySQL database inside Docker!");
  });

  connection.query("SELECT * FROM data;", (error, rows) => {
    console.log(rows);
  });

  return connection;
};
