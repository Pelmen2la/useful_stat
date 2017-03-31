import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators/yesNo.js';
import ListItem from './ListItem.jsx'
import CardPopup from './CardPopup.jsx'

const YesNo = React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            openedCard = cards.find((c) => c.get('id') === this.props.openedCardId),
            cardItems = cards.map((c) => <ListItem onItemTitleClick={props.setOpenedCardId} onVoteButtonClick={props.cardVote}
                                                   key={c.get('id')} data={c} />);

        return <div>
            {cardItems}
            {openedCard && <CardPopup onVoteButtonClick={props.cardVote} onCloseButtonClick={() => props.setOpenedCardId(null)}
                data={openedCard} />}
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : [],
        openedCardId: state ? state.get('openedCardId') : null
    };
}

export const YesNoContainer = connect(mapStateToProps, actionCreators)(YesNo);