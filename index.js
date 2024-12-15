const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/img/barang", express.static(path.join(__dirname, "upload")));

app.get("/", (req, res) => {
  res.send("<h1>apapun<h1>");
});

app.use("/users", require("./routes/user"));
app.use("/kategori", require("./routes/kategori"));
app.use("/barang", require("./routes/barang"));
app.use("/transaction", require("./routes/transaction"));

app.listen(3000, () => {
  console.log("server has been started");
});
