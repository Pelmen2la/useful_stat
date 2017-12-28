import React from 'react';

export default React.createClass({
    render: function() {
        var props = this.props,
            buttons = [];
        for(var i = 1; i <= 5; i++) {
            let className = props.cssClass + ' icon ' + (props.value >= i ? 'selected' : '');
            let val = i;
            buttons.push(<span className={className} onClick={props.disableChange ? null : () => props.onValueChanged(val)} key={i}>
            </span>)
        }
        return <div className="rating-control">
            {buttons}
        </div>
    }
});