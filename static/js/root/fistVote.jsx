import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {FistVoteContainer} from '../components/fistVote/Main.jsx'
import reducer from './../reducers/fistVote.js';
import {setState} from './../action_creators/fistVote.js';
import utils from './../utils/appUtils.js';
import socket from './../socket/fistVote.js';

import './../../scss/fistVote.scss'

const store = createStore(reducer);

socket.on('connect', function() {
    socket.on('state', function(state) {
        state.cards.forEach(function(c) {
            c.vote = utils.getItemPropertyCache(c.id, 'vote');
        });
        store.dispatch(setState({
                cards: state.cards,
                showResultsBeforeVote: state.showResultsBeforeVote,
                statId: state.id
            })
        );
    });
});

ReactDOM.render(
    <Provider store={store}>
        <FistVoteContainer/>
    </Provider>,
    document.getElementById('Root'));
