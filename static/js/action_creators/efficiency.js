export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function randomizeRates(entry) {
    return {
        type: 'RANDOMIZE_RATES',
        entry
    };
}

export function setOpenedCardId (cardId) {
    return {
        type: 'SET_OPENED_CARD',
        cardId
    };
}

export function setCardPropertyRate(cardId, propertyName, val) {
    return {
        type: 'SET_CARD_PROPERTY_RATE',
        cardId,
        propertyName,
        val
    };
}