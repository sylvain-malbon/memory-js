
import React from 'react';
import './Title.css';


function Title({ asSpan }) {
    if (asSpan) {
        return <span className="title-tab">Memory-JS : Drapeaux</span>;
    }
    return <div className="title-tab">Memory-JS : Drapeaux</div>;
}

export default Title;
