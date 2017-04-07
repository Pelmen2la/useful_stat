import {Map} from 'immutable';
import utils from '../utils/appUtils.js';
import socket from './../socket/fistVote.js';

function setState(state, newState) {
    return state.merge(newState);
};

function voteCard(state, cardId, vote) {
    socket.emit('voteCard', state.get('statId'), {
        cardId: cardId,
        vote: vote,
        prevVote: utils.getItemPropertyCache(cardId, 'vote')
    });
    utils.setItemProperty(state, 'cards', cardId, 'vote', vote, true);
    return state;
};
export default function(state=Map(), action='') {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'VOTE_CARD':
            return voteCard(state, action.cardId, action.vote);
  }
};