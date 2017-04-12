import React from 'react';

export default React.createClass({
    render: function() {
        var props = this.props;
        return <div className="progress-bar">
            <div className="progress" style={{width: props.progress * 100 + '%'}}></div>
            <div className="text">
                {props.text}
            </div>
        </div>
    }
});