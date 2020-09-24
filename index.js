const express = require('express')

const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()

const f_welcome = require('./fulfillments/default/welcome')
const f_fallback = require('./fulfillments/default/fallback')
const f_getWeather = require('./fulfillments/custom/getWeather')


// Fixes cannot GET/ 
app.get('/', (req, res) => {
    res.send("Test")
});

app.post('/', express.json(), (req, res) => {
  
    const agent = new WebhookClient({ request: req, response: res })
   
    var intentMap = new Map()

    intentMap.set('Default Welcome Intent', f_welcome.fulfillment)
    intentMap.set('Default Fallback Intent', f_fallback.fulfillment)
    intentMap.set('getWeather', f_getWeather.fulfillment)

    agent.handleRequest(intentMap)
})

// Startup server on port 8080
// Log success message to console
app.listen(8080, () => console.log("Server is live at port 8080"));
