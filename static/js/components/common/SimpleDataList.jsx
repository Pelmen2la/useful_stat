import React from 'react';

export default React.createClass({
    render: function() {
        var props = this.props,
            items = props.items.map((i) => <li key={i.get('id')}>
                {props.itemRightControlsGetter && <div className="right-controls">{props.itemRightControlsGetter(i)}</div>}
                {i.get('title')}
                {props.itemBottomControlsGetter && <div className="bottom-controls">{props.itemBottomControlsGetter(i)}</div>}
            </li>);
        return <ul className="simple-data-list">
            {items}
        </ul>
    }
});