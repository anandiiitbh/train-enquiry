const express = require("express");
const usersRouter = require("./routes/users");
const app = express();
const port = 3000;

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.get("/pnr", async (_req, res) => {
  const url = "https://www.confirmtkt.com/pnr-status?pnr=" + _req.query.pnr;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    var doc = await response.text();
    var index = doc.indexOf("data = {") + 7;
    var str = doc.substring(index, index + 5000);
    var index2 = str.indexOf('"};') + 2;
    var str1 = str.substring(0, index2);
    var data = JSON.parse(str1);
    console.log("status sent for pnr: " + _req.query.pnr);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
