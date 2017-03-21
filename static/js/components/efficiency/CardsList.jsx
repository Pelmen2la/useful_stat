import React from 'react';
import FullScreenPopup from './../common/FullScreenPopup.jsx';

export default React.createClass({
    render: function() {
        var props = this.props,
            cards = props.cards,
            cardItems = cards.map(function(c, i) {
                return <div className="item" key={c.get('id')}>
                <span>
                    {c.get('title')}
                </span>
                    <span className={"icon " + (c.get('isHidden') ? 'hidden' : 'visible')}
                        onClick={() => props.onToggleCardVisibilityButtonClick(c.get('id'))}></span>
                </div>
            }),
            cardsList = <div className="efficiency-cards-list">{cardItems}</div>;

        return <FullScreenPopup items={cardsList} onCloseButtonClick={props.onClose}></FullScreenPopup>
    }
});