import React from 'react';
import utils from './../../utils/appUtils.js';

export default React.createClass({
    render: function() {
        var props = this.props,
            data = props.data,
            averageEfficiencyRate = utils.getListAverage(data.get('efficiencyRates')),
            averageTimeCostRate = utils.getListAverage(data.get('timeCostRates')),
            resultJsx =
                <div>
                    <div className="param-block">
                        <span className="icon time"></span>
                        {averageTimeCostRate}
                    </div>
                    <div className="param-block">
                        <span className="icon perfomance"></span>
                        {averageEfficiencyRate}
                    </div>
                </div>;


        return <div style={getPositionStyles(props.showResult ? averageEfficiencyRate : 0, props.showResult ? averageTimeCostRate : 0)}
                    className={"card " + (data.get('isHidden') ? 'hidden' : '')} onClick={() => props.setOpenedCardId(data.get('id'), true)}>
            <p>{data.get('title')}</p>

            { props.showResult ? resultJsx : ''}
        </div>
    }
});

function getPositionStyles(averageEfficiencyRate, averageTimeCostRate) {
    var posStyles = {},
        blockSize = 16;

    averageEfficiencyRate > 2.5 ?
        (posStyles.right = (5 - averageEfficiencyRate) * blockSize + '%') :
        (posStyles.left= averageEfficiencyRate * blockSize + '%');
    averageTimeCostRate > 2.5 ?
        (posStyles.top = (5 - averageTimeCostRate) * blockSize + '%') :
        (posStyles.bottom = averageTimeCostRate * blockSize + '%');

    return posStyles;
};