import React from 'react';

export default React.createClass({
    render: function() {
        var props = this.props;
        return <span className="vote-buttons">
            <img src={getImageSrc("finger_down", props.vote !== 'no')} onClick={() => props.onVoteButtonClick('no')}/>
            <span className="number minus">{props.noCount}</span>
            <img src={getImageSrc("finger_up", props.vote !== 'yes')}  onClick={() => props.onVoteButtonClick('yes')}/>
            <span className="number plus">{props.yesCount}</span>
        </span>

        function getImageSrc(imageName, isDisabled) {
            return "/resources/images/icons/common/svg/" + imageName + (isDisabled ? '_disabled' : '') + ".svg";
        }
    }
});