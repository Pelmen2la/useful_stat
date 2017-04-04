import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators/dotstorming.js';
import ListItem from './ListItem.jsx'

const Dotstorming = React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            cardItems = cards.map((c) => <ListItem onAddDotButtonClick={props.addDot}
                                                   onRemoveDotButtonClick={props.removeDot} key={c.get('id')} data={c} />);

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

export const DotstormingContainer = connect(mapStateToProps, actionCreators)(Dotstorming);