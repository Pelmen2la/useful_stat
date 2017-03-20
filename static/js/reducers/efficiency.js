import {Map} from 'immutable';
import utils from '../utils/appUtils.js';
import socket from './../socket/efficiency.js';

function setState(state, newState) {
    return state.merge(newState);
};

function setCardProperty(state, cardId, propertyName, val) {
    var cards = state.get('cards');
    cards = cards.update(
        cards.findIndex((c) => c.get('id') === cardId),
        function(c) {
            c = c.set(propertyName, val);
            return c;
        }
    );
    state = state.set('cards', cards);
    return state;
};

function setOpenedCardId(state, cardId) {
    return state.set('openedCardId', cardId);
};

function setCardRateProperty(state, cardId, propertyName, val) {
    socket.emit('setCardProperty', state.get('graphId'), {
        cardId: cardId,
        propertyName: propertyName,
        val: val,
        oldVal: utils.getGraphCardPropertyCash(cardId, propertyName)
    });
    utils.setGraphCardPropertyCash(cardId, propertyName, val);

    return state;
}

export default function(state = Map(), action) {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'RANDOMIZE_RATES':
            return randomizeRates(state, action.entry);
        case 'SET_OPENED_CARD':
            return setOpenedCardId(state, action.cardId);
        case 'SET_CARD_PROPERTY_RATE':
            return setCardRateProperty(state, action.cardId, action.propertyName, action.val);
  }
};