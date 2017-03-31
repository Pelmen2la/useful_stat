export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function setOpenedCardId(cardId) {
    return {
        type: 'SET_OPENED_CARD',
        cardId
    };
}

export function cardVote(cardId, vote) {
    return {
        type: 'VOTE_CARD',
        cardId,
        vote
    };
}