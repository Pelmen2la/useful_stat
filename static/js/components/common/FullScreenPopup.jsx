import React from 'react';

export default React.createClass({
    render: function() {
        let props = this.props;
        return <div className="popup-wrapper">
            <div className="mask"></div>
            <div className="content-wrapper">
                <div className='content'>
                    <span className="icon close" onClick={() => props.onCloseButtonClick()}></span>
                    {props.items}
                </div>
            </div>
        </div>
    }
});