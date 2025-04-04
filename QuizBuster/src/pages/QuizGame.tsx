import { useState, useEffect } from 'react';
import './QuizGame.css';
import * as axios from "axios";
import { AxiosResponse } from "axios";

// Antwortoptionen mit Text und Info, ob korrekt
interface AnswerOption {
    text: string;
    correct: boolean;
}

// Fragenstruktur mit Text, Antworten und Kategorie
interface Question {
    question: string;
    answers: AnswerOption[];
    category: string;
}

// Struktur der API-Antwort (wie die Daten von der Trivia-API zurückkommen)
interface QuestionResponse {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

// Axios-Client mit Basis-URL zur Open Trivia DB API
const client = axios.default.create({
    baseURL: 'https://opentdb.com',
});

const QuizGame: React.FC = () => {
    // React States für Spielzustand
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(20);

    // Trivia API laden (wird nur beim ersten Rendern ausgeführt)
    useEffect(() => {
        const fetchQuestions = async () => {
            const queryString = `?amount=3&type=multiple`; // Hier kann man auch Kategorien etc. hinzufügen
            try {
                const response: AxiosResponse = await client.get(`/api.php${queryString}`);
                const results: QuestionResponse[] = response.data.results;

                // Antworten mischen und in eigenes Format bringen
                const formattedQuestions: Question[] = results.map((q) => {
                    const allAnswers: AnswerOption[] = [
                        ...q.incorrect_answers.map(ans => ({ text: decodeURIComponent(ans), correct: false })),
                        { text: decodeURIComponent(q.correct_answer), correct: true },
                    ];

                    // Fisher-Yates-Algorithmus zum Mischen der Antworten
                    for (let i = allAnswers.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
                    }

                    return {
                        question: decodeURIComponent(q.question),
                        answers: allAnswers,
                        category: decodeURIComponent(q.category),
                    };
                });

                // Zustand mit den formatierten Fragen aktualisieren
                setQuestions(formattedQuestions);
            } catch (err) {
                console.error("Fehler beim Laden der Fragen:", err);
            }
        };

        fetchQuestions();
    }, []);

    // Timer: zählt herunter, wenn noch keine Antwort ausgewählt wurde
    useEffect(() => {
        if (selectedAnswerIndex !== null || showScore) return; // Nicht runterzählen, wenn Frage schon beantwortet wurde
        if (timeLeft === 0) {
            handleAnswerOptionClick(null, false); // Bei Timeout: Frage als falsch gewertet
            return;
        }

        // Jede Sekunde den Timer runterzählen
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        // Timer beim Verlassen des Effekts löschen
        return () => clearInterval(timer);
    }, [timeLeft, selectedAnswerIndex, showScore]);

    // Timer zurücksetzen bei neuer Frage
    useEffect(() => {
        setTimeLeft(20);
    }, [currentQuestion]);

    // Antwort-Handling: speichert Antwort, aktualisiert Punkte, springt zur nächsten Frage
    const handleAnswerOptionClick = (index: number | null, isCorrect: boolean): void => {
        if (selectedAnswerIndex !== null) return; // Doppelklick verhindern

        setSelectedAnswerIndex(index);

        if (isCorrect) {
            setScore((prevScore) => prevScore + 1); // Punktestand erhöhen
        }

        // Kurze Verzögerung, bevor zur nächsten Frage gesprungen wird
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswerIndex(null);
            } else {
                setShowScore(true); // Quiz ist vorbei
                setShowLeaderboardPrompt(true); // Optional: Prompt für Highscore oder Weiterleitung
            }
        }, 1500);
    };

    // Falls noch keine Fragen geladen wurden
    if (questions.length === 0) {
        return <div className="quiz">Lade Fragen...</div>;
    }

    return (
        <div className="quiz">
            {showScore ? (
                // Ergebnisanzeige am Ende des Quiz
                <div className="score-section">
                    <p>
                        Du hast {score} von {questions.length} Fragen richtig beantwortet!
                    </p>
                </div>
            ) : (
                <>
                    {/* Anzeige der aktuellen Frage */}
                    <div className="question-section">
                        <div className="question-category">
                            Kategorie: {questions[currentQuestion].category}
                        </div>
                        <div className="timer">
                            <div className="timer-bar" style={{ width: `${(timeLeft / 20) * 100}%` }}></div>
                            <span className="timer-text">{timeLeft}s</span>
                        </div>
                        <div className="question-text">
                            {questions[currentQuestion].question}
                        </div>
                    </div>

                    {/* Anzeige der Antwortoptionen */}
                    <div className="answer-section">
                        {questions[currentQuestion].answers.map((answerOption, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerOptionClick(index, answerOption.correct)}
                                className={`answer-button ${
                                    selectedAnswerIndex !== null
                                        ? answerOption.correct
                                            ? 'correct'
                                            : 'incorrect'
                                        : ''
                                }`}
                                disabled={selectedAnswerIndex !== null}
                            >
                                {answerOption.text}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizGame;
