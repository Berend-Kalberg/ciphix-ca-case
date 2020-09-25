/**
 * Intent: Default Fallback Intent
 * Fulfillment: default
 */
const fetch = require('node-fetch')

module.exports = {

    fulfillment: async function (agent) {

        // Retrieves city parameter from Dialogflow
        // If a city has been entered that cannot be found in the api the application crashes
        var oldCity = agent.parameters['geo-city'];
        // Retrieves date from Dialogflow
        var dateString = agent.parameters['date']
        var timeString = agent.parameters['time']

        // Log city to console for debugging
        console.log(oldCity)

        // Added this function so api calls with special characters get filtered
        var city = oldCity.replace(/[áàâä]/g, 'a')
            .replace(/[úùûüū]/g, 'u')
            .replace(/[íïìîįī]/g, 'i')
            .replace(/[óöôòõœøō]/g, 'o')
            .replace(/[éëêèęėē]/g, 'e')

       

        // Log date to console for debugging
        console.log("dialogflow: " + dateString)

        // dateString to Date object places in variable date
        var date = new Date(dateString)

        var time = new Date(timeString)

        // Log date to console for debugging
        console.log("converted: " + date)

        // Retrieves month from date
        var month = date.getMonth()

        // Log month to console for debugging
        console.log("month: " + month)

        // Retrieves day from date
        var day = date.getDate()

        // Log day to console for debugging
        console.log("day: " + day)

        var hour = time.getHours()

        console.log("hour: " + hour)

        var time = date.getTime()

        console.log(time / 1000)

        // Constant variable with my api key
        const apiKey = '459cf5b03efcfd9a0f668270e083ee99'

        // Constant variable with the url required for the request
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=nl&units=metric`

        // Log url for debugging
        console.log(url)

        // Request made to url (api)
        // The api contains the weather for the next 5 days with intervals every 3 hours
        // The request size is 5 x 8 (24h / 3h) = 40 items
         const weatherPreFlight = await fetch(url)
            const weatherResponse = await weatherPreFlight.json()
            // console.log(weatherResponse)
            // If error is not 'null', log the error for debugging
            if (weatherResponse.error != null) {
                console.log('error: ', weatherResponse.error)
                // Else log 'no errors detected during the request' to console for debugging
            } else {
                console.log('no errors detected during the request')
            }

            // Log statuscode to console for debugging (200 = OK)
            console.log('statuscode: ', weatherResponse.cod)

            // Create obj variable which gets parsed JSON from the request
            var obj = weatherResponse

            // Log list from obj to debug retrieved data from api
            // Gives a lot of data so better comment it out unless actively debugging
            // console.log(obj.list)
            for (var i = 0; i < obj.list.length; i++) {
                console.log(obj.list[i].dt)
            }

            // Log list length for debugging
            console.log('total list length: ' + obj.list.length)

            // User sees this message if no weather has been found for their date
            var description = "Geen geschikte data gevonden voor deze datum"

            // Loop trough all the list items
            for (var i = 0; i < obj.list.length; i++) {
                // The api contains dt (date) which is in milliseconds so our date (in seconds) has to be converted to this format (* 1000)
                var date = new Date(obj.list[i].dt * 1000)
                console.log(date)
                var weather = obj.list[i].weather[0].description
                let temp = obj.list[i].main.temp
                let dateText = obj.list[i].dt_txt

                var correctedHours = date.getHours() - 2 

                // Log month and day with their list number to console for debugging
                console.log(i + ":" + ' month is: ' + date.getMonth())
                console.log(i + ":" + ' day is: ' + date.getDate())
                console.log(i + ":" + ' hour is: ' + date.getHours())

                // If month and day match user input description will update to the expected weather for that day
                if (date.getMonth() == month && date.getDate() == day && correctedHours == hour) {
                    description = weather + " verwacht met een temperatuur van " + temp + " graden op " + dateText
                    console.log(obj.list[i])
                }
            }
            // Send description back to Dialogflow
            await agent.add(description)
    }

}

