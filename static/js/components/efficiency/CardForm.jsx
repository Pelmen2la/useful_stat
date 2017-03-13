import React from 'react';
import RatingControl from './RatingControl.jsx';

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data;

        return <div className="popup-wrapper">
            <div className="mask"></div>
            <div className="content-wrapper">
                <div className="efficiency-card-form">
                    <span className="icon close" onClick={() => props.onCloseButtonClick()}></span>

                    <p>{data.get('title')}</p>
                    <RatingControl cssClass="time" value={data.get('efficiencyRate')}
                                   onValueChanged={(val) => props.onPropertyRateChange(data.get('id'), 'efficiency', val)}/>
                    <RatingControl cssClass="perfomance" value={data.get('timeCostRate')}
                                   onValueChanged={(val) => props.onPropertyRateChange(data.get('id'), 'timeCost', val)}/>
                </div>
            </div>
        </div>
    }
});