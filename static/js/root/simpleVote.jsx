import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {SimpleVoteContainer} from '../components/simpleVote/Main.jsx'
import reducer from './../reducers/simpleVote.js';
import {setState} from './../action_creators/simpleVote.js';
import utils from './../utils/appUtils.js';
import socket from './../socket/simpleVote.js';

import './../../css/common.css'
import './../../css/simpleVote.css'

const store = createStore(reducer);

socket.on('connect', function() {
    socket.on('state', function(state) {
        state.cards.forEach(function(c) {
            c.voted = utils.getItemPropertyCache(c.id, 'voted') || false;
        });
        store.dispatch(setState({
                cards: state.cards,
                statId: state.id
            })
        );
    });
});

ReactDOM.render(
    <Provider store={store}>
        <SimpleVoteContainer/>
    </Provider>,
    document.getElementById('Root'));
