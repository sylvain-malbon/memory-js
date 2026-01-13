import React, { useState, useEffect } from "react";
import "./App.css";
import Title from "./Components/Title/Title";
import Button from "./Components/Button/Button";
import Card from "./Components/Card/Card";
import DifficultySelector from "./Components/DifficultySelector/DifficultySelector";

// 48 drapeaux européens + occidentaux
const allFlags = [
  "🇩🇪", "🇦🇹", "🇧🇪", "🇧🇬", "🇨🇾", "🇭🇷", "🇩🇰", "🇪🇸", "🇪🇪", "🇫🇮", "🇫🇷", "🇬🇷",
  "🇭🇺", "🇮🇪", "🇮🇹", "🇱🇻", "🇱🇹", "🇱🇺", "🇲🇹", "🇳🇱", "🇵🇱", "🇵🇹", "🇨🇿", "🇷🇴",
  "🇸🇰", "🇸🇮", "🇸🇪",
  "🇬🇧", "🇳🇴", "🇨🇭", "🇮🇸", "🇱🇮", "🇦🇱", "🇷🇸", "🇧🇦", "🇲🇪", "🇲🇰", "🇽🇰", "🇺🇦",
  "🇲🇩", "🇧🇾", "🇬🇪", "🇦🇲", "🇦🇿",
  "🇺🇸", "🇨🇦", "🇦🇺", "🇳🇿"
];

function App() {
  const [difficulty, setDifficulty] = useState('beginner');
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [win, setWin] = useState(false);

  // Sélectionne les drapeaux selon la difficulté
  const getFlagsByDifficulty = () => {
    if (difficulty === 'beginner') return allFlags.slice(0, 8);
    if (difficulty === 'intermediate') return allFlags.slice(0, 18);
    return allFlags;
  };

  // Mélanger les cartes
  const shuffleCards = () => {
    const selectedFlags = getFlagsByDifficulty();
    const duplicated = [...selectedFlags, ...selectedFlags]; // créer les paires
    const shuffled = duplicated
      .map((img, idx) => ({
        id: `${img}-${idx}-${Math.random()}`,
        image: img,
        matched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setWin(false);
  };

  // Lancer une partie au chargement ou au changement de difficulté
  useEffect(() => {
    shuffleCards();
    // eslint-disable-next-line
  }, [difficulty]);

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

      <DifficultySelector value={difficulty} onChange={setDifficulty} />

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
