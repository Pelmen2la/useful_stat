import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators/dotstorming.js';
import SimpleDataList from '../common/SimpleDataList.jsx';
import Dots from './Dots.jsx';
import utils from './../../utils/appUtils.js';

const Dotstorming = React.createClass({
    render: function() {

        var props = this.props,
            cards = props.cards,
             userDotsCount = cards.reduce(function(res, card) {
                return res + card.get('userDotsCount');
            }, 0),
            userDotsLimitReached = userDotsCount >= props.maxDotsCount,
            itemBottomControlsGetter = (c) => <Dots hasAddDotButton={!userDotsLimitReached} onAddDotButtonClick={props.addDot}
                                                   onRemoveDotButtonClick={props.removeDot} key={c.get('id')} data={c}/>;

        return <div>
            <SimpleDataList items={cards} itemBottomControlsGetter={itemBottomControlsGetter}/>
            <div className="remaing-dots-count">
                {props.maxDotsCount - userDotsCount}
                <span className="dot user-dot"/>
            </div>
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : [],
        userDotsLimitReached: state && state.get('userDotsLimitReached'),
        maxDotsCount: state && state.get('maxDotsCount')
    };
}

export const DotstormingContainer = connect(mapStateToProps, actionCreators)(Dotstorming);