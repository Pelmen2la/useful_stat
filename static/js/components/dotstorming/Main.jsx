import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators/dotstorming.js';
import ListItem from './ListItem.jsx'
import utils from './../../utils/appUtils.js';

const Dotstorming = React.createClass({
    render: function() {

        var props = this.props,
            cards = props.cards,
            userDotsLimitReached = cards.reduce(function(res, card) {
                var userDotsCount = utils.getItemPropertyCache(card.get('id'), 'userDotsCount');
                return res + (userDotsCount || 0)
            }, 0) >= 10,
            cardItems = cards.map((c) => <ListItem hasAddDotButton={!userDotsLimitReached} onAddDotButtonClick={props.addDot}
                                                   onRemoveDotButtonClick={props.removeDot} key={c.get('id')} data={c} />);

        return <div>
            {cardItems}
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : [],
        userDotsLimitReached: state && state.get('userDotsLimitReached')
    };
}

export const DotstormingContainer = connect(mapStateToProps, actionCreators)(Dotstorming);