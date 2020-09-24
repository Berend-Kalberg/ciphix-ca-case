# Athos Documentation
Athos is the virtual flight assistant bot I have created with Dialogflow. I'm using OpenWeatherMap API and specifically the 5 day forecast with has 3 hour intervals.

[API Link](https://openweathermap.org/forecast5)

## Added Features
- Find the weather in nearly any major city
- Find the weather forecast for the next 5 days
- Smalltalk

## Example for conversational flow: user input -> and Athos output
- Hé -> Hallo! Wat is je naam?
- [Naam] -> Fijn om kennis met je te maken. Mijn naam is Athos. Ben je benieuwd wat ik voor jou kan doen?
- Ja -> Ik kan op dit moment het weer in de meeste plaatsen voorspellen, voor de komende 5 dagen. Voor welke stad en datum kan ik jou het weer voorspellen?
- Wat is het weer in Denver op 28 september? -> onbewolkt verwacht met een temperatuur van 26.55 graden op Mon Sep 28 2020 23:00:00 GMT+0200 (Central European Summer Time)

## Special requirements
- npm request

## Code documentation
Add special characters to this code in index.js to remove them from city names before they are send to the API. OpenWeatherMap api does not handle special characters very well that is why this code is very important.
```
var city = oldCity.replace(/[áàâä]/g, 'a')
            .replace(/[úùûüū]/g, 'u')
            .replace(/[íïìîįī]/g, 'i')
            .replace(/[óöôòõœøō]/g, 'o')
            .replace(/[éëêèęėē]/g, 'e')
```
Timestamps in OpenWeatherMap are in milliseconds so dates have to be converted to this format to be able to match the right list item in the request
```
 for (var i=0;i<obj.list.length;i++) {
                // The api contains dt (date) which is in milliseconds so our date (in seconds) has to be converted to this format (* 1000)
                var date = new Date(obj.list[i].dt * 1000)
                var weather = obj.list[i].weather[0].description
                let temp = obj.list[i].main.temp

                // If month and day match user input description will update to the expected weather for that day
                if (date.getMonth() == month && date.getDate() == day) {
                    description = weather + " verwacht met een temperatuur van " + temp + " graden op " + date.toString()
                }
            }
```