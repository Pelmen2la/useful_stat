import React from 'react';
import ProgressBar from './../common/ProgressBar.jsx';

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data,
            isVoted = data.get('voted'),
            voteCount = data.get('voteCount');
        return <div className="simplevote-entry">
            <p className="title">{data.get('title')}</p>
            <img src={'/resources/images/icons/common/svg/check_circle' + (isVoted ? '' : '_empty') + '.svg'}
                className="vote-button" onClick={() => !isVoted && props.onVoteButtonClick(data.get('id')) }/>
            <ProgressBar text={ voteCount + ' / ' + props.totalCount } progress={ voteCount / props.totalCount }>
            </ProgressBar>
        </div>
    }
});