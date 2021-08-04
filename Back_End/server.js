const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("db connection successful"))
  .catch(() => console.log("db connection unsuccesful"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);   
});
 