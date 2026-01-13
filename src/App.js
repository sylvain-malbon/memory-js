import React, { useState, useEffect } from "react";
import "./App.css";
import Title from "./Components/Title/Title";
import Button from "./Components/Button/Button";
import Card from "./Components/Card/Card";

// 48 drapeaux européens + occidentaux
const images = [
  "🇩🇪", "🇦🇹", "🇧🇪", "🇧🇬", "🇨🇾", "🇭🇷", "🇩🇰", "🇪🇸", "🇪🇪", "🇫🇮", "🇫🇷", "🇬🇷",
  "🇭🇺", "🇮🇪", "🇮🇹", "🇱🇻", "🇱🇹", "🇱🇺", "🇲🇹", "🇳🇱", "🇵🇱", "🇵🇹", "🇨🇿", "🇷🇴",
  "🇸🇰", "🇸🇮", "🇸🇪",
  "🇬🇧", "🇳🇴", "🇨🇭", "🇮🇸", "🇱🇮", "🇦🇱", "🇷🇸", "🇧🇦", "🇲🇪", "🇲🇰", "🇽🇰", "🇺🇦",
  "🇲🇩", "🇧🇾", "🇬🇪", "🇦🇲", "🇦🇿",
  "🇺🇸", "🇨🇦", "🇦🇺", "🇳🇿"
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [win, setWin] = useState(false);

  // Mélanger les cartes
  const shuffleCards = () => {
    const duplicated = [...images, ...images]; // créer les paires
    const shuffled = duplicated
      .map((img) => ({
        id: Math.random(),
        image: img,
        matched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setWin(false);
  };

  // Lancer une partie au chargement
  useEffect(() => {
    shuffleCards();
  }, []);

  // Gestion du clic sur une carte
  const handleChoice = (card) => {
    if (disabled) return;

    if (!choiceOne) {
      setChoiceOne(card);
    } else if (card.id !== choiceOne.id) {
      setChoiceTwo(card);
    }
  };

  // Comparaison des deux cartes
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.image === choiceTwo.image) {
        // Marquer les cartes trouvées
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.image === choiceOne.image ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        // Retourner après un délai
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Réinitialiser le choix
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  // Détecter la victoire
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWin(true);
    }
  }, [cards]);

  return (
    <div className="App">
      <Title />

      <Button text="Relancer la partie" onClick={shuffleCards} />

      {win && <p className="win">Bravo, vous avez gagné !</p>}

      <div className="board">
        {cards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            matched={card.matched}
            onClick={() => handleChoice(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
