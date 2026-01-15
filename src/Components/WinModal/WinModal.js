import React from "react";
import "../../App.css";
import Button from "../Button/Button";

function WinModal({ onClose }) {
    return (
        <div className="win-modal-overlay">
            <div className="win-modal">
                <h2>Bravo, vous avez gagné !</h2>
                <Button text="Fermer" onClick={onClose} />
            </div>
        </div>
    );
}

export default WinModal;
