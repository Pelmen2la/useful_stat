import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {EfficiencyContainer} from './../components/efficiency/Main.jsx'
import reducer from './../reducers/efficiency.js';
import {setState} from './../action_creators/efficiency.js';
import utils from './../utils/appUtils.js';
import socket from './../socket/efficiency.js';

import './../../scss/efficiency.scss'

const store = createStore(reducer);

socket.on('connect', function() {
    socket.on('state', function(state) {
        state.cards.forEach(function(c) {
            c.timeCostRate = utils.getItemPropertyCache(c.id, 'timeCost');
            c.efficiencyRate = utils.getItemPropertyCache(c.id, 'efficiency');
        });
        store.dispatch(setState({
                cards: state.cards,
                allowRevote : state.allowRevote,
                graphId: state.id
            })
        );
    });
});

ReactDOM.render(
    <Provider store={store}>
        <EfficiencyContainer/>
    </Provider>,
    document.getElementById('Root'));
