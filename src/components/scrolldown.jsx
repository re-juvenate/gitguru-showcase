import React from 'react';
import './scrolldown.css';

const ScrollDown = () => {
    return (
        <div className="scrolldown my-28" style={{ '--color': 'skyblue' }}>
            <div className="chevrons">
                <div className="chevrondown"></div>
                <div className="chevrondown"></div>
            </div>
        </div>
    );
};

export default ScrollDown;