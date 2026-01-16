import React from "react";
import Card from "../Card/Card";
import "./Board.css";

function Board({ cards, choiceOne, choiceTwo, handleChoice, disabled }) {
    return (
        <div className="board">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    image={card.image}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    matched={card.matched}
                    onClick={() => handleChoice(card)}
                    disabled={disabled}
                />
            ))}
        </div>
    );
}

export default Board;
