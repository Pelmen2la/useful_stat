import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {YesNoContainer} from './../components/yesNo/Main.jsx'
import reducer from './../reducers/yesNo.js';
import {setState} from './../action_creators/yesNo.js';
import utils from './../utils/appUtils.js';
import socket from './../socket/yesNo.js';

import './../../scss/yesNo.scss'

const store = createStore(reducer);

socket.on('connect', function() {
    socket.on('state', function(state) {
        state.cards.forEach(function(c) {
            c.vote = utils.getItemPropertyCache(c.id, 'vote');
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
        <YesNoContainer/>
    </Provider>,
    document.getElementById('Root'));
