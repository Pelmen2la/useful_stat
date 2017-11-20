var utils = require('./Utils');

function createCardsStatEntry(model, data, cardDefaults) {
    data.cards = data.cardsText.map(function(text) {
        var card = {
            id: utils.getUid(),
            title: text
        };
        for(key in cardDefaults) {
            cardDefaults.hasOwnProperty(key) && (card[key] = cardDefaults[key]);
        }
        return card;
    });
    delete data.cardsText;
    data.date = new Date();
    !data.id && (data.id = utils.getUid());
    return new model(data);
};

module.exports = {
    createCardsStatEntry: createCardsStatEntry
};