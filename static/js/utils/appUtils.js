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

export default {
    getRandomFloat: getRandomFloat,
    getRandomInt: getRandomInt,
    getListAverage: getListAverage,
    getArrayAverage: getArrayAverage,
    setItemProperty: setItemProperty,
    setItemPropertyCache: setItemPropertyCache,
    getItemPropertyCache: getItemPropertyCache
};