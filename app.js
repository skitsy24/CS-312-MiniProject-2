import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", (req,res) => {
    console.log(req.body.latitude)
    console.log(req.body.longitude)
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});