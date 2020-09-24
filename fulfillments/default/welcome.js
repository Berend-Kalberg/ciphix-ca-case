/**
 * Intent: Default Welcome Intent
 * Fulfillment: default
 */

module.exports = {

    fulfillment: function (agent) {
        
        agent.add(
            `Welkom! Wat is je naam?`
        )

    }

}
