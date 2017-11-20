import React from 'react';
import utils from './../../utils/appUtils.js';

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data,
            id = data.get('id'),
            dots = [],
            dostCount = data.get('dotsCount');

        for(var i = 0; i < dostCount; i++) {
            var isUserDot = dostCount - i <= data.get('userDotsCount'),
                showDot = isUserDot || (props.showResultDots);
            showDot && dots.push(<li key={i} className={'dot ' + (isUserDot ? 'user-dot' : '')}
                          onClick={isUserDot ? () => props.onRemoveDotButtonClick(id) : null}/>);
        }
        props.hasAddDotButton && dots.push(<li key={dostCount} className={'dot add-dot'}
                                               onClick={() => props.onAddDotButtonClick(id)}/>);

        return <ul>
            {dots}
        </ul>
    }
});