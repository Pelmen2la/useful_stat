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

function setCardFormIsOpen(state, cardId, val) {
    return setCardProperty(state, cardId, 'isFormVisible', val);
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
        case 'SET_CARD_FORM_IS_OPEN':
            return setCardFormIsOpen(state, action.cardId, action.val);
        case 'SET_CARD_PROPERTY_RATE':
            return setCardRateProperty(state, action.cardId, action.propertyName, action.val);
  }
};