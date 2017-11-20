import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators/simpleVote.js';
import utils from './../../utils/appUtils.js';
import SimpleDataList from '../common/SimpleDataList.jsx'
import ProgressBar from './../common/ProgressBar.jsx';

const SimpleVote = React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            totalVotesCount = cards.reduce((prev, current) => { return prev + current.get('voteCount') }, 0),
            itemRightControlsGetter = (c) => <span className={'vote-button icon' + (c.get('voted') ? ' check' : '')}
                                                   onClick={() => !c.get('voted') && props.voteCard(c.get('id')) }/>,
            itemBottomControlsGetter = (c) => props.showResult ? <ProgressBar text={ c.get('voteCount') + ' / ' + totalVotesCount }
                                                           progress={ c.get('voteCount') / totalVotesCount }/> : '';

        return <SimpleDataList items={cards} itemRightControlsGetter={itemRightControlsGetter}
                               itemBottomControlsGetter={itemBottomControlsGetter}/>;
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : [],
        voteCardId: state && state.get('voteCardId'),
        showResult: state && state.get('showResult')
    };
}

export const SimpleVoteContainer = connect(mapStateToProps, actionCreators)(SimpleVote);