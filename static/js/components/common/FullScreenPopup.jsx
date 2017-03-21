import React from 'react';

export default React.createClass({
    render: function() {
        let props = this.props;
        return <div className="popup-wrapper" style={{zIndex: props.zIndex || 20}}>
            <div className="mask"></div>
            <div className="content-wrapper">
                <div className={'content ' + (props.bodyClass || '')}>
                    <span className="icon close" onClick={() => props.onCloseButtonClick()}></span>
                    {props.items}
                </div>
            </div>
        </div>
    }
});