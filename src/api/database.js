import sqlite3 from "sqlite3";

export const connectToDb = () => {
  const db = new sqlite3.Database("../../data/sogaz.db", (error) => {
    if (error) {
      console.log("errro connecting to DB");
      throw error;
    }
  });
  return db;
};
