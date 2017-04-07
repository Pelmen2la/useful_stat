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
            voteButtons.push(<img key={i} src={getVoteButtonImageSrc(i, i === vote)}
                                  onClick={() => props.onVoteButtonClick(id, i)}/>);
        }
        return <div className="fistvote-entry">
            <p className="title">{data.get('title')}</p>
            {vote !== undefined&& <img className="average-vote" src={getVoteButtonImageSrc(averageVote, true)}/>}
            <div className="vote-buttons-container">
                {voteButtons}
            </div>
        </div>

        function getVoteButtonImageSrc(index, isActive) {
            return "/resources/images/icons/common/svg/fingers" + index + (isActive ? '' : '_not_active') + ".svg";
        }
    }
});