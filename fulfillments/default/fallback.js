/**
 * Intent: Default Fallback Intent
 * Fulfillment: default
 */

module.exports = {

    fulfillment: function (agent) {
    
        agent.add(
            `Sorry, ik kan je hiermee niet helpen. Je kan aan mij vragen wat ik allemaal kan doen.`
        )

    }

}
