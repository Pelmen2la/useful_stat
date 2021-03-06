import ReactCookie from 'react-cookie';
import io from 'socket.io-client';

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
    return arr.length ? sum / arr.length : 0;
};

function setItemProperty(state, itemsKey, itemId, propertyName, val, withCache) {
    var items = state.get(itemsKey);
    items = items.update(
        items.findIndex((c) => c.get('id') === itemId),
        function(c) {
            c = c.set(propertyName, val);
            return c;
        }
    );
    state = state.set(itemsKey, items);
    withCache && setItemPropertyCache(itemId, propertyName, val);
    return state;
};

function getActionsCache() {
    return (ReactCookie.load('actionsCache') || {});
};

function getItemCacheKey(itemId, propertyName) {
    return itemId + '_' + propertyName;
};

function getItemPropertyCache(itemId, propertyName) {
    return getActionsCache()[getItemCacheKey(itemId, propertyName)];
};

function setItemPropertyCache(itemId, propertyName, val) {
    var cache = getActionsCache();
    cache[getItemCacheKey(itemId, propertyName)] = val;
    ReactCookie.save('actionsCache', cache);
};

function getCurrentRoomSocket(port) {
    const socket = io(window.location.origin + ':' + port);
    let splittedPath = window.location.pathname.split('/');

    socket.roomId = splittedPath[splittedPath.length - 1];

    socket.on('connect', function() {
        socket.emit('joinRoom', socket.roomId);
        socket.emit('stateRequest', socket.roomId);
    });

    return socket;
};

export default {
    getRandomFloat: getRandomFloat,
    getRandomInt: getRandomInt,
    getListAverage: getListAverage,
    getArrayAverage: getArrayAverage,
    setItemProperty: setItemProperty,
    setItemPropertyCache: setItemPropertyCache,
    getItemPropertyCache: getItemPropertyCache,
    getCurrentRoomSocket: getCurrentRoomSocket
};