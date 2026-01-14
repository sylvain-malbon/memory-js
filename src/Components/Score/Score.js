import React from 'react';
import './Score.css';

function Score({ score }) {
    return (
        <div className="score-container">
            <span>Score : </span>
            <span className="score-value">{score}</span>
        </div>
    );
}

export default Score;
