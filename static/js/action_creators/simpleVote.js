export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function voteCard(cardId) {
    return {
        type: 'VOTE_CARD',
        cardId
    };
}