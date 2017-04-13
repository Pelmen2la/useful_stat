import React from 'react';
import utils from './../../utils/appUtils.js';

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data,
            id = data.get('id'),
            vote = data.get('vote'),
            averageVote = Math.round(utils.getListAverage(data.get('votes')) || 0),
            voteButtons = [];

        for(let i = 0; i <= 5; i++) {
            voteButtons.push(<span key={i} className={getVoteButtonClassName(i, i === vote)}
                                  onClick={() => props.onVoteButtonClick(id, i)}/>);
        }
        return <div className="fistvote-entry">
            <p className="title">{data.get('title')}</p>
            {vote !== undefined && <span className={"average-vote " + getVoteButtonClassName(averageVote, true)}/>}
            <div className="vote-buttons-container">
                {voteButtons}
            </div>
        </div>

        function getVoteButtonClassName(index, isActive) {
            return "icon fingers" + index + (isActive ? '' : ' not-active');
        }
    }
});