import React from 'react';
import VoteButtons from './VoteButtons.jsx'

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data,
            id = data.get('id');
        return <div className="yesno-entry">
            <span onClick={() => props.onItemTitleClick(id)} className="title">{data.get('title')}</span>
            <VoteButtons yesCount={data.get('yesCount')} noCount={data.get('noCount')} vote={data.get('vote')}
                onVoteButtonClick={(vote) => props.onVoteButtonClick(id, vote)}></VoteButtons>
        </div>
    }
});