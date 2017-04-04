import React from 'react';
import utils from './../../utils/appUtils.js';

export default React.createClass({
    render: function() {
        var props = this.props,
            data = this.props.data,
            id = data.get('id'),
            dots = [],
            dostCount = data.get('dotsCount'),
            userDotsCount = utils.getItemPropertyCache(data.get('id'), 'userDotsCount');

        for(var i = 0; i < dostCount; i++) {
            var isUserDot = dostCount - i <= userDotsCount;
            dots.push(<li key={i} className={isUserDot ? 'user-dot' : ''}
                          onClick={isUserDot ? () => props.onRemoveDotButtonClick(id) : null}></li>);
        }
        dots.push(<li key={dostCount} className={'add-dot'} onClick={() => props.onAddDotButtonClick(id)}></li>);

        return <div className="dotstorming-card">
            <p>{data.get('title')}</p>
            <ul className="dots-container">
                {dots}
            </ul>
        </div>
    }
});