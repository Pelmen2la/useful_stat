import {Map} from 'immutable';
import utils from '../utils/appUtils.js';
import socket from './../socket/simpleVote.js';

function setState(state, newState) {
    return state.merge(newState);
};

function voteCard(state, cardId) {
    var oldVoteCard = state.get('cards').find((c) => { return c.get('voted'); }),
        oldVoteCardId = oldVoteCard ? oldVoteCard.get('id') : null;
    socket.emit('voteCard', state.get('statId'), {
        cardId: cardId,
        oldVoteCardId: oldVoteCardId
    });
    utils.setItemProperty(state, 'cards', cardId, 'voted', true, true);
    oldVoteCardId && utils.setItemProperty(state, 'cards', oldVoteCardId, 'voted', false, true);
    return state;
};

export default function(state=Map(), action='') {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'VOTE_CARD':
            return voteCard(state, action.cardId);
  }
};