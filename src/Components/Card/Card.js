import React from 'react'; 

function Card({ image, flipped, matched, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            {flipped || matched ? (
                <img src={image} alt="carte" />
            ) : (
                <div className="back"></div>
            )}
        </div>
    );
}

export default Card;
