export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function cardVote(cardId, vote) {
    return {
        type: 'VOTE_CARD',
        cardId,
        vote
    };
}