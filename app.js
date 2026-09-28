import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", async (req,res) => {
    const lat = req.body.latitude;
    const long = req.body.longitude;
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?temperature_unit=fahrenheit&wind_speed_unit=mph&latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,wind_speed_10m`);
    res.send(response.data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});