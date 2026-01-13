import React from 'react';

function Card({ image, flipped, matched, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            {flipped || matched ? (
                <span className="emoji" aria-label="carte">{image}</span>
            ) : (
                <div className="back"></div>
            )}
        </div>
    );
}

export default Card;
