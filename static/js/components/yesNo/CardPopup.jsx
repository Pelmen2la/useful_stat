import React from 'react';
import VoteButtons from './VoteButtons.jsx';
import Popup from './../common/Popup.jsx';

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data,
            items = <div>
                <p>{data.get('title')}</p>
                <VoteButtons yesCount={data.get('yesCount')} noCount={data.get('noCount')} vote={data.get('vote')}
                    onVoteButtonClick={(vote) => props.onVoteButtonClick(data.get('id'), vote)}></VoteButtons>
            </div>;

        return <Popup items={items} zIndex="5" bodyClass="yesno-card-form" onCloseButtonClick={props.onCloseButtonClick}>
        </Popup>
    }
});