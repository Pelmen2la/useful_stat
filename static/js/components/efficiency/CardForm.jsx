import React from 'react';
import RatingControl from './RatingControl.jsx';
import Popup from './../common/Popup.jsx';

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data,
            eRate = data.get('efficiencyRate'),
            tcRate = data.get('timeCostRate'),
            items = <div>
                <p>{data.get('title')}</p>
                <RatingControl cssClass="perfomance" value={eRate} disableChange={eRate && !props.allowRevote}
                               onValueChanged={(val) => props.onPropertyRateChange(data.get('id'), 'efficiency', val)}/>
                <RatingControl cssClass="time" value={tcRate} disableChange={tcRate && !props.allowRevote}
                               onValueChanged={(val) => props.onPropertyRateChange(data.get('id'), 'timeCost', val)}/>
            </div>;

        return <Popup items={items} bodyClass="efficiency-card-form" zIndex="25" onCloseButtonClick={props.onFormClose}>
        </Popup>
    }
});