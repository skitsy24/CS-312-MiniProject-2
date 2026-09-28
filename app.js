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
    
    const temperature = response.data.current.temperature_2m;
    const precipitation = response.data.current.precipitation;
    const windSpeed = response.data.current.wind_speed_10m;

    let recommendation = "You're Good to Go";

    if (
        temperature < 40 ||
        temperature > 95 ||
        precipitation > 1 ||
        windSpeed > 20
    ) {
        recommendation = "Don't Ride, for your own sake";
    }
    else if (
        temperature < 50 ||
        temperature > 85 ||
        precipitation > 0 ||
        windSpeed > 12
    ) {
        recommendation = "Please Ride with Caution";
    }

    res.render("index.ejs", {
        temperature: temperature,
        precipitation: precipitation,
        windSpeed: windSpeed,
        recommendation: recommendation
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});