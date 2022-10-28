const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=076974c5b87aef4d8929b4eadbf4b1e5&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const desc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon 

      res.write("<p>The weather is currently " + desc + "<p>");
      res.write ("<h1>The temperature in London is " + temp + " degrees Celcius.</h1>");
      res.send()
    })
  })
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
