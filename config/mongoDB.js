module.exports = require("mongoose")
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });
