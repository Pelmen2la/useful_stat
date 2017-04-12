import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators/simpleVote.js';
import ListItem from './ListItem.jsx'
import utils from './../../utils/appUtils.js';

const SimpleVote = React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            totalVotesCount = cards.reduce((prev, current) => { return prev + current.get('voteCount') }, 0),
            cardItems = cards.map((c) => <ListItem onVoteButtonClick={props.voteCard} key={c.get('id')} data={c}
                totalCount={totalVotesCount} />);

        return <div>
            {cardItems}
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : [],
        voteCardId: state && state.get('voteCardId')
    };
}

export const SimpleVoteContainer = connect(mapStateToProps, actionCreators)(SimpleVote);