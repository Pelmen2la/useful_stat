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
                isResultVisible={props.showResultsBeforeVote || c.get('vote')}
                onVoteButtonClick={(vote) => c.get('vote') === undefined || props.allowRevote ? props.cardVote(c.get('id'), vote) : false}/>;
        return <SimpleDataList items={cards} itemRightControlsGetter={itemRightControlsGetter}/>
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : [],
        showResultsBeforeVote: state && state.get('showResultsBeforeVote'),
        openedCardId: state ? state.get('openedCardId') : null,
        allowRevote: state && state.get('allowRevote')
    };
}

export const YesNoContainer = connect(mapStateToProps, actionCreators)(YesNo);