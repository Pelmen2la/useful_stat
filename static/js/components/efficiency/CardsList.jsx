import React from 'react';
import Popup from './../common/Popup.jsx';

export default React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            cardItems = cards.map(function(c, i) {
                let id = c.get('id');
                return <div className="item" key={id}>
                    <span className="text">
                        {c.get('title')}
                    </span>
                    <span className={"icon " + (c.get('isHidden') ? 'hidden' : 'visible')}
                        onClick={() => props.onToggleCardVisibilityButtonClick(id)}></span>
                    <span className="icon form" onClick={() => props.onShowFormButtonClick(id)}></span>
                </div>
            });

        return <Popup items={cardItems} bodyClass="efficiency-cards-list" onCloseButtonClick={props.onClose}></Popup>
    }
});