import {Map} from 'immutable';
import utils from '../utils/appUtils.js';
import socket from './../socket/yesNo.js';

function setState(state, newState) {
    return state.merge(newState);
};

function voteCard(state, cardId, vote) {
    socket.emit('voteCard', state.get('statId'), {
        cardId: cardId,
        vote: vote,
        oldVote: utils.getItemPropertyCache(cardId, 'vote')
    });
    utils.setItemProperty(state, 'cards', cardId, 'vote', vote, true);
    return state;
};

function setOpenedCardId(state, cardId) {
    return state.set('openedCardId', cardId);
};

export default function(state=Map(), action='') {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'SET_OPENED_CARD':
            return setOpenedCardId(state, action.cardId);
        case 'VOTE_CARD':
            return voteCard(state, action.cardId, action.vote);
  }
};