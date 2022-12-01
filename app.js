const express = require(`express`);
const bodyParser = require(`body-parser`);
const https = require(`node:https`);
const { json } = require("body-parser");

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/`, function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

app.post(`/`, function (req, res) {
  const userQuery = req.body.cityName;
  const query = userQuery;
  const apiKey = `403864bba3153fb0f80cce452152abf7`;
  const unit = `metric`;

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${query}&units=${unit}`;
  https.get(apiURL, function (response) {
    console.log(response.statusCode);
    response.on(`data`, function (data) {
      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      const temperature = weatherData.main.temp;
      const weatherIconCode = weatherData.weather[0].icon;
      const weatherIconURl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
      res.write(`<h1>The temperatue in ${query} is ${temperature}&#8451;</h1>`);
      res.write(`<p>The weather is currently ${weatherDescription}.</p>`);
      res.write(`<img src="${weatherIconURl}" alt="weather icon" />`);
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log(`Server started listening on port ${port}`);
});
