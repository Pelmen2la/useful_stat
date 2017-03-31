import React from 'react';
import {connect} from 'react-redux';
import SmallCard from './SmallCard.jsx'
import CardForm from './CardForm.jsx';
import CardsList from './CardsList.jsx';
import * as actionCreators from '../../action_creators/efficiency.js';

const Efficiency = React.createClass({
    render: function() {
        var cards = this.props.cards,
            cardItems = cards.map((c, i) => <SmallCard data={c} setOpenedCardId={this.props.setOpenedCardId} key={c.get('id')}/>),
            openedCard = cards.find((c) => c.get('id') === this.props.openedCardId),
            gridLayoutItems = getGridLayoutItems();

        return <div className="efficiency-main-container">

            <div className="cards-container">
                {gridLayoutItems}
                {cardItems}
            </div>

            <div className="toolbar">
                <button onClick={() => this.props.setCardListVisibility(true)}>Show Card List</button>
            </div>

            {openedCard ? <CardForm data={openedCard} onPropertyRateChange={this.props.setCardPropertyRate}
                onFormClose={() => this.props.setOpenedCardId(null)}></CardForm> : ''}

            {this.props.cardListVisibility ? <CardsList cards={cards} onClose={() => this.props.setCardListVisibility(false)}
                onToggleCardVisibilityButtonClick={this.props.toggleCardVisibility}
                onShowFormButtonClick={this.props.setOpenedCardId}></CardsList> : ''}
        </div>;

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
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : [],
        openedCardId: state ? state.get('openedCardId') : null,
        cardListVisibility: state ? state.get('cardListVisibility') : false
    };
}

export const EfficiencyContainer = connect(mapStateToProps, actionCreators)(Efficiency);