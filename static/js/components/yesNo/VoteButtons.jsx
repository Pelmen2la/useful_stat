import React from 'react';

export default React.createClass({
    render: function() {
        var props = this.props;
        return <span className="vote-buttons">
            <span className={getIconClassName("finger-down", props.vote === 'no')} onClick={() => props.onVoteButtonClick('no')}/>
            <span className="number minus">{props.noCount}</span>
            <span className={getIconClassName("finger-up", props.vote === 'yes')}  onClick={() => props.onVoteButtonClick('yes')}/>
            <span className="number plus">{props.yesCount}</span>
        </span>

        function getIconClassName(imageName, isActive) {
            return "icon " + imageName + (isActive ? '' : ' not-active');
        }
    }
});