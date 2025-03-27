import React from 'react';
import './Game.css'; // Stelle sicher, dass du eine separate CSS-Datei verwendest

const Game = () => {
    return (
        <div className="game-container">
            <h2 className="title">Bereit, dein Wissen herauszufordern?</h2>
            <p className="description">In unserem Multiplayer-Quiz kannst du gegen Freunde oder andere Spieler antreten und herausfinden, wer der wahre Quiz-Meister ist!</p>
            <p className="subheading"><strong>Wie funktioniert es?</strong></p>
            <p className="step">1. <strong>Wähle eine Kategorie</strong> – Du kannst aus verschiedenen Themenbereichen auswählen und dein Wissen auf die Probe stellen.</p>
            <p className="step">2. <strong>Spiele gegen andere</strong> – Fordere andere Spieler heraus und tritt im Echtzeit-Multiplayer-Modus an.</p>
            <p className="step">3. <strong>Beantworte Fragen</strong> – Zeige, wie schnell du auf die richtigen Antworten kommst! Jede richtige Antwort bringt dich näher zum Sieg.</p>
            <p className="outcome"><strong>Sieg oder Niederlage</strong> – Der Spieler mit den meisten Punkten am Ende des Spiels gewinnt. Wirst du der nächste Quiz-Champion?</p>
            <p className="finale">Egal, ob du alleine spielst oder gegen deine Freunde, unser Multiplayer-Quiz ist die perfekte Gelegenheit, dein Wissen in verschiedenen Bereichen zu testen. Bist du bereit? Starte dein erstes Spiel und finde heraus, wer die meisten Punkte erzielt!</p>
        </div>
    );
};

export default Game;
