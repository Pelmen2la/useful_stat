import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators/fistVote.js';
import ListItem from './ListItem.jsx'

const FistVote = React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            cardItems = cards.map((c) => <ListItem onVoteButtonClick={props.cardVote} key={c.get('id')} data={c} />);

        return <div>
            {cardItems}
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : []
    };
}

export const FistVoteContainer = connect(mapStateToProps, actionCreators)(FistVote);