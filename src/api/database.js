import mysql from "mysql2";

export const connectToDb = () => {
  const connection = mysql.createConnection({
    host: "172.17.0.2",
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

  return connection;
};
