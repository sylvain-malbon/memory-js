import React from 'react';

function Card({ image, flipped, matched, onClick }) {
    return (
        <div className={`card${flipped || matched ? ' flipped' : ''}`} onClick={onClick}>
            <div className="card-inner">
                {/* Face avant (emoji, visible seulement si flipped ou matched) */}
                <div className="card-front">
                    {(flipped || matched) ? (
                        <span className="emoji" aria-label="carte">{image}</span>
                    ) : null}
                </div>
                {/* Face arrière (dos de la carte) */}
                <div className="card-back"></div>
            </div>
        </div>
    );
}

export default Card;
