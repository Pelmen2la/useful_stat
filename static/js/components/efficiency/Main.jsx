import React from 'react';
import {connect} from 'react-redux';
import SmallCard from './SmallCard.jsx'
import * as actionCreators from '../../action_creators/efficiency.js';

const Efficiency = React.createClass({
    render: function() {
        var cards = this.props.cards.map((c, i) => <SmallCard data={c} setCardFormIsOpen={this.props.setCardFormIsOpen} key={i}
                onCardFormPropertyRateChange={this.props.setCardPropertyRate}/>),
            gridLayoutItems = getGridLayoutItems();
        return <div className="efficiency-main-container">
            {gridLayoutItems}
            {cards}
        </div>;
    }
});

function getGridLayoutItems() {
    var items = [];
    for(var i = 0; i < 5; i++) {
        for(var j = 0; j < 5; j++) {
            var xPos = i * 20 + '%',
                yPos = j * 20 + '%',
                key = i.toString() + j.toString();
            items.push(<div style={{left: xPos, top: yPos}} className="grid-layout-item" key={key}></div>)
        }
    }
    return items;
}

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : []
    };
}

export const EfficiencyContainer = connect(mapStateToProps, actionCreators)(Efficiency);