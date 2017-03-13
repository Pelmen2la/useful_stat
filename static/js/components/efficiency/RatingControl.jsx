import React from 'react';

export default React.createClass({
    render: function() {
        var buttons = [];
        for(var i = 1; i <= 5; i++) {
            let className = this.props.cssClass + ' icon ' + (this.props.value >= i ? 'selected' : '');
            let val = i;
            buttons.push(<span className={className} onClick={() => this.props.onValueChanged(val)} key={i}>
            </span>)
        }
        return <div className="rating-control">
            {buttons}
        </div>
    }
});