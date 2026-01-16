import React, { useState, useEffect } from "react";
import "./App.css";
import Title from "./Components/Title/Title";
import Button from "./Components/Button/Button";
import Card from "./Components/Card/Card";
import DifficultySelector from "./Components/DifficultySelector/DifficultySelector";
import Score from "./Components/Score/Score";
import WinModal from "./Components/WinModal/WinModal";

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
  const [tries, setTries] = useState(0); // nombre d'essais
  const [success, setSuccess] = useState(0); // nombre de paires trouvées

  // Sélectionne les drapeaux selon la difficulté
  const getFlagsByDifficulty = () => {
    switch (difficulty) {
      case 'beginner':
        return allFlags.slice(0, 8); // 8 paires, 16 cartes
      case 'intermediate':
        return allFlags.slice(0, 16); // 16 paires, 32 cartes
      case 'advanced':
        return allFlags.slice(0, 24); // 24 paires, 48 cartes
      case 'expert':
        return allFlags.slice(0, 32); // 32 paires, 64 cartes
      case 'master':
        return allFlags.slice(0, 40); // 40 paires, 80 cartes
      case 'legend':
        return allFlags.slice(0, 48); // 48 paires, 96 cartes
      default:
        return allFlags.slice(0, 8);
    }
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
    setTries(0);
    setSuccess(0);
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
      setTries((prev) => prev + 1); // chaque paire retournée = 1 essai

      if (choiceOne.image === choiceTwo.image) {
        // Marquer les cartes trouvées
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.image === choiceOne.image ? { ...card, matched: true } : card
          )
        );
        setSuccess((prev) => prev + 1); // succès = paires trouvées
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

  // Calcul du score : essais - succès
  const score = tries - success;

  // Gestion du clic sur le logo/titre (rafraîchit la partie)
  const handleLogoClick = (e) => {
    e.preventDefault();
    shuffleCards();
  };

  // Gestion du clic sur le score (exemple : reset score, ici on relance la partie)
  const handleScoreClick = () => {
    shuffleCards();
  };

  return (
    <div className="App">
      <div className="game-area">
        <div className="top-bar">
          <a href="#" className="site-logo-link" onClick={handleLogoClick} style={{ textDecoration: 'none' }}>
            <span>
              <Title asSpan />
            </span>
          </a>
          <div className="restart-btn">
            <Button text="Relancer la partie" onClick={shuffleCards} />
          </div>
          <div>
            <Score score={score} onClick={handleScoreClick} clickable />
          </div>
        </div>
        <div className="difficulty-bar">
          <DifficultySelector value={difficulty} onChange={setDifficulty} />
        </div>
        {win && <WinModal onClose={() => setWin(false)} />}
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
    </div>
  );
}

export default App;
