var utils = require('./Utils');

function createCardsStatEntry(model, data, cardDefaults) {
    var cards = data.cardsText.split('{sep}').map(function(text) {
        var card = {
            id: utils.getUid(),
            title: text
        };
        for(key in cardDefaults) {
            cardDefaults.hasOwnProperty(key) && (card[key] = cardDefaults[key]);
        }
        return card;
    });
    return new model({
        id: data.id || utils.getUid(),
        date: new Date(),
        cards: cards
    });
};

module.exports = {
    createCardsStatEntry: createCardsStatEntry
};