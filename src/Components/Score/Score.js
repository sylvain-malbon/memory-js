import React from 'react';
import './Score.css';



function Score({ score, onClick, clickable }) {
    return (
        <div
            className={"score-container" + (clickable ? " clickable" : "")}
            onClick={clickable ? onClick : undefined}
            style={clickable ? { cursor: "pointer" } : {}}
        >
            <span className="score-label">Score :</span>
            <span className="score-value">{score}</span>
        </div>
    );
}

export default Score;
