db.createUser({
  user: "kalman",
  pwd: "123",
  roles: [
    {
      role: "readWrite",
      db: "sogaz",
    },
  ],
});
