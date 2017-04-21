import React from 'react';

export default React.createClass({
    render: function() {
        var props = this.props;
        return <span className={'icon fingers' + props.index + (props.isActive ? '' : ' not-active')}
            onClick={() => props.onClick && props.onClick()}/>
    }
});