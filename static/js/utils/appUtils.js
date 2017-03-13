import ReactCookie from 'react-cookie';

function getRandomInt(min, max) {
    return Math.floor(getRandomFloat(min, max));
};

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
};

function getListAverage(list) {
    return getArrayAverage(list.toJS());
};

function getArrayAverage(arr) {
    var sum = 0;
    arr.forEach((e) => sum += e);
    return sum / arr.length;
};

function getGraphVotedCash() {
    return (ReactCookie.load('graphVotedCash') || {});
};

function getGraphCardCacheKey(cardId, propertyName) {
    return cardId + '_' + propertyName;
};

function getGraphCardPropertyCash(cardId, propertyName) {
    return getGraphVotedCash()[getGraphCardCacheKey(cardId, propertyName)];
};

function setGraphCardPropertyCash(cardId, propertyName, val) {
    var cache = getGraphVotedCash();
    cache[getGraphCardCacheKey(cardId, propertyName)] = val;
    ReactCookie.save('graphVotedCash', cache);
};

export default {
    getRandomFloat: getRandomFloat,
    getRandomInt: getRandomInt,
    getListAverage: getListAverage,
    getArrayAverage: getArrayAverage,
    setGraphCardPropertyCash: setGraphCardPropertyCash,
    getGraphCardPropertyCash: getGraphCardPropertyCash
};