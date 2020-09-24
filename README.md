# Athos Documentation
Athos is the virtual flight assistant bot I have created with Dialogflow. I'm using OpenWeatherMap API and specifically the 5 day forecast with has 3 hour intervals.

[API Link](https://openweathermap.org/forecast5)

## Added Features
- Find the weather in nearly any major city
- Find the weather forecast for the next 5 days
- Smalltalk

## Example for conversational flow: user input -> and Athos output
- Hé -> Hallo! Wat is je naam?
- [Naam] -> Fijn om kennis met je te maken. Mijn naam is Aphros. Ben je benieuwd wat ik voor jou kan doen?
- Ja -> Ik kan op dit moment het weer in de meeste plaatsen voorspellen, voor de komende 5 dagen. Voor welke stad en datum kan ik jou het weer voorspellen?

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