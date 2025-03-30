import React, { useState, useEffect } from "react";
import "./Game.css";

// Dummy-Daten für das Quiz
const categories = [
    {
        id: "math",
        name: "Mathematik",
        questions: [
            {
                question: "Was ist 5 + 7?",
                options: ["10", "12", "14", "11"],
                correctAnswer: "12",
            },
            {
                question: "Was ist die Quadratwurzel von 16?",
                options: ["5", "4", "6", "3"],
                correctAnswer: "4",
            },
            {
                question: "Wie viele Seiten hat ein Hexagon?",
                options: ["5", "6", "7", "8"],
                correctAnswer: "6",
            },
            {
                question: "Was ist 9 * 3?",
                options: ["18", "27", "24", "30"],
                correctAnswer: "27",
            },
        ],
    },
    {
        id: "gk",
        name: "Allgemeinwissen",
        questions: [
            {
                question: "Welcher Planet ist der größte in unserem Sonnensystem?",
                options: ["Mars", "Saturn", "Jupiter", "Erde"],
                correctAnswer: "Jupiter",
            },
            {
                question: "Wer hat die Relativitätstheorie entwickelt?",
                options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
                correctAnswer: "Albert Einstein",
            },
            {
                question: "Wie viele Kontinente gibt es?",
                options: ["5", "6", "7", "8"],
                correctAnswer: "7",
            },
            {
                question: "Welches Element hat das chemische Symbol 'O'?",
                options: ["Gold", "Silber", "Sauerstoff", "Eisen"],
                correctAnswer: "Sauerstoff",
            },
        ],
    },
    {
        id: "history",
        name: "Geschichte",
        questions: [
            {
                question: "Wann endete der Zweite Weltkrieg?",
                options: ["1939", "1945", "1918", "1950"],
                correctAnswer: "1945",
            },
            {
                question: "Wer war der erste Präsident der USA?",
                options: ["Abraham Lincoln", "John F. Kennedy", "George Washington", "Thomas Jefferson"],
                correctAnswer: "George Washington",
            },
            {
                question: "In welchem Jahr fiel die Berliner Mauer?",
                options: ["1985", "1991", "1979", "1989"],
                correctAnswer: "1989",
            },
            {
                question: "Welches Reich wurde von Julius Caesar erobert?",
                options: ["Ägypten", "Gallien", "Persien", "Byzanz"],
                correctAnswer: "Gallien",
            },
        ],
    },
];

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

interface Category {
    id: string;
    name: string;
    questions: Question[];
}

const Game: React.FC = () => {
    const [round, setRound] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);
    const [timeLeft, setTimeLeft] = useState(20);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        if (timeLeft > 0 && question) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            nextRound();
        }
    }, [timeLeft, question]);

    const handleCategorySelect = (categoryId: string) => {
        const category = categories.find((cat) => cat.id === categoryId);
        if (category) {
            setSelectedCategory(category);
            setQuestion(category.questions[Math.floor(Math.random() * category.questions.length)]);
            setTimeLeft(20);
            setSelectedAnswer(null);
            setAnswerCorrect(null);
        }
    };

    const handleAnswer = (answer: string) => {
        if (!question) return;
        setSelectedAnswer(answer);
        const isCorrect = answer === question.correctAnswer;
        setAnswerCorrect(isCorrect);
        if (isCorrect) {
            setScore(score + 1);
        }
        setTimeout(nextRound, 1000);
    };

    const nextRound = () => {
        if (round < 4) {
            setRound(round + 1);
            setSelectedCategory(null);
            setQuestion(null);
        } else {
            setGameOver(true);
        }
    };

    return (
        <div className="game-container">
            {gameOver ? (
                <h2 className="title">Spiel beendet! Dein Score: {score}</h2>
            ) : (
                <>
                    <h2 className="title">Runde {round}/4</h2>
                    <p className="description">Zeit: {timeLeft}s</p>
                    {selectedCategory ? (
                        question ? (
                            <div>
                                <h3 className="subheading">{question.question}</h3>
                                <div className="options">
                                    {question.options.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`step ${selectedAnswer === option ? (answerCorrect ? "correct" : "wrong") : ""}`}
                                            onClick={() => handleAnswer(option)}
                                            disabled={selectedAnswer !== null}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="description">Lade Frage...</p>
                        )
                    ) : (
                        <>
                            <h3 className="subheading">Wähle eine Kategorie:</h3>
                            {categories.map((cat) => (
                                <button className="step" key={cat.id} onClick={() => handleCategorySelect(cat.id)}>
                                    {cat.name}
                                </button>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Game;
