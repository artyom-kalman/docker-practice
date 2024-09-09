import mysql from "mysql2";

export const connectToDb = () => {
  const dbpool = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: "3306",
    user: "root",
    password: "123",
    database: "sogaz",
  });

  let conn;
  const attemptConnection = () =>
    dbpool.getConnection((err, connection) => {
      if (err) {
        console.log("error connecting. retrying in 1 sec");
        setTimeout(attemptConnection, 1000);
      } else {
        dbpool.end();
        conn = mysql.createConnection({
          host: process.env.MYSQL_HOST || "localhost",
          port: "3306",
          user: "root",
          password: "123",
          database: "sogaz",
        });
        conn.query("SELECT * FROM data;", (err, rows) => {
          console.log(rows);
        });
      }
    });

  attemptConnection();

  return conn;
};
