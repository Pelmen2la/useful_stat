import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators/fistVote.js';
import utils from './../../utils/appUtils.js';
import VoteButtons from './VoteButtons.jsx';
import SimpleDataList from '../common/SimpleDataList.jsx';
import FistIcon from './FistIcon.jsx';

const FistVote = React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            itemRightControlsGetter = (c) => c.get('vote') ?
                <FistIcon isActive={true} index={Math.round(utils.getListAverage(c.get('votes')))}/> : '',
            itemBottomControlsGetter = (c) => <VoteButtons onVoteButtonClick={props.cardVote} data={c}/>;

        return <SimpleDataList items={cards} itemRightControlsGetter={itemRightControlsGetter}
            itemBottomControlsGetter={itemBottomControlsGetter}/>;
    }
});

function mapStateToProps(state) {
    return {
        cards: state ? state.get('cards') : []
    };
}

export const FistVoteContainer = connect(mapStateToProps, actionCreators)(FistVote);