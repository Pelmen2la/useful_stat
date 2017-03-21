import React from 'react';
import FullScreenPopup from './../common/FullScreenPopup.jsx';

export default React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            cardItems = cards.map(function(c, i) {
                let id = c.get('id');
                return <div className="item" key={id}>
                    <span>
                        {c.get('title')}
                    </span>
                    <span className={"icon " + (c.get('isHidden') ? 'hidden' : 'visible')}
                        onClick={() => props.onToggleCardVisibilityButtonClick(id)}></span>
                    <span className="icon form" onClick={() => props.onShowFormButtonClick(id)}></span>
                </div>
            });

        return <FullScreenPopup items={cardItems} bodyClass="efficiency-cards-list" onCloseButtonClick={props.onClose}></FullScreenPopup>
    }
});