import {getRandomFloat} from './appUtils.js';

function createEfficiencyCards() {
    var cards = [];
    for(var i = 0; i < 10; i++) {
        cards.push({
            text: 'Sample Text ' + i,
            efficiencyRate: getRandomFloat(0, 5),
            timeCostRate: getRandomFloat(0, 5)
        });
    }
    return cards;
};

export {createEfficiencyCards};