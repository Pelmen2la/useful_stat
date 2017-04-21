import React from 'react';
import FistIcon from './FistIcon.jsx'

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data,
            id = data.get('id'),
            voteButtons = [];

        for(let i = 0; i <= 5; i++) {
            voteButtons.push(<FistIcon key={i} isActive={data.get('vote') === i} index={i} onClick={() => props.onVoteButtonClick(id, i)}/>);
        }
        return <div className="vote-buttons-container">
            {voteButtons}
        </div>

        function getVoteButtonClassName(index, isActive) {
            return "icon fingers" + index + (isActive ? '' : ' not-active');
        }
    }
});