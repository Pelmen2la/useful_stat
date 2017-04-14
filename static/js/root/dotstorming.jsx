import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {DotstormingContainer} from './../components/dotstorming/Main.jsx'
import reducer from './../reducers/dotstorming.js';
import {setState} from './../action_creators/dotstorming.js';
import utils from './../utils/appUtils.js';
import socket from './../socket/dotstorming.js';

import './../../scss/dotstorming.scss'

const store = createStore(reducer);

socket.on('connect', function() {
    socket.on('state', function(state) {
        state.cards.forEach(function(c) {
            c.userDotsCount = utils.getItemPropertyCache(c.id, 'userDotsCount') || 0;
        });
        store.dispatch(setState({
                cards: state.cards,
                maxDotsCount: state.maxDotsCount,
                statId: state.id
            })
        );
    });
});

ReactDOM.render(
    <Provider store={store}>
        <DotstormingContainer/>
    </Provider>,
    document.getElementById('Root'));
