import React from 'react';
import RatingControl from './RatingControl.jsx';
import FullScreenPopup from './../common/FullScreenPopup.jsx';

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data,
            items = <div className="efficiency-card-form">
                <p>{data.get('title')}</p>
                <RatingControl cssClass="time" value={data.get('efficiencyRate')}
                               onValueChanged={(val) => props.onPropertyRateChange(data.get('id'), 'efficiency', val)}/>
                <RatingControl cssClass="perfomance" value={data.get('timeCostRate')}
                               onValueChanged={(val) => props.onPropertyRateChange(data.get('id'), 'timeCost', val)}/>
            </div>

        return <FullScreenPopup items={items} onCloseButtonClick={props.onFormClose}>
        </FullScreenPopup>
    }
});