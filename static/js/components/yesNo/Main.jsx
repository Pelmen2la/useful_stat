import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators/yesNo.js';
import SimpleDataList from '../common/SimpleDataList.jsx';
import VoteButtons from './VoteButtons.jsx';

const YesNo = React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            itemRightControlsGetter = (c) => <VoteButtons yesCount={c.get('yesCount')} noCount={c.get('noCount')} vote={c.get('vote')}
                onVoteButtonClick={(vote) => props.cardVote(c.get('id'), vote)}/>;

        return <SimpleDataList items={cards} itemRightControlsGetter={itemRightControlsGetter}/>
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : [],
        openedCardId: state ? state.get('openedCardId') : null
    };
}

export const YesNoContainer = connect(mapStateToProps, actionCreators)(YesNo);