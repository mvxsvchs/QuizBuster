import { useState, useEffect } from 'react';
import './QuizGame.css';
import * as axios from "axios";
import { AxiosResponse } from "axios";

// Antwortoption mit Text und Kennzeichnung, ob korrekt
interface AnswerOption {
    text: string;
    correct: boolean;
}

// Interne Datenstruktur für eine Quizfrage
interface Question {
    question: string;
    answers: AnswerOption[];
    category: string;
}

// Struktur der API-Antwort vom Backend
interface QuestionResponse {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

// Kategorie mit ID und Namen
interface Category {
    id: number;
    name: string;
}

// Axios-Instanz für API-Aufrufe
const client = axios.default.create({
    baseURL: 'http://localhost:8000',
});

// Hauptkomponente für das Quiz
const QuizGame: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(20);

    const [round, setRound] = useState<number>(0); // 3 Runden
    const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // Punktestand per PATCH an das Backend senden
    const submitScoreToAPI = async (score: number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Kein Token gefunden – Score wird nicht gesendet.");
            return;
        }

        try {
            await client.patch("/user/score", { points: score }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Score erfolgreich übermittelt:", score);
        } catch (error) {
            console.error("Fehler beim Score-Patch:", error);
        }
    };

    // Spielzustand auf Anfang zurücksetzen
    const restartGame = () => {
        setScore(0);
        setRound(0);
        setSelectedCategory(null);
        setQuestions([]);
        setShowScore(false);
        setCurrentQuestion(0);
        setSelectedAnswerIndex(null);
    };

    // Kategorien vom Server laden (bei jeder neuen Runde)
    useEffect(() => {
        if (round < 3 && !selectedCategory) {
            client.get('category').then((res: AxiosResponse<Category[]>) => {
                setAvailableCategories(res.data);
            });
        }
    }, [round, selectedCategory]);

    // Kategorie auswählen und dazugehörige Fragen laden
    const handleCategorySelect = async (category: Category) => {
        setSelectedCategory(category);

        const res: AxiosResponse<QuestionResponse[]> = await client.get(`question?category=${category.id}`);

        // Fragen in internes Format umwandeln
        const formattedQuestions: Question[] = res.data.map((q) => {
            const allAnswers: AnswerOption[] = [
                ...q.incorrect_answers.map(ans => ({ text: ans, correct: false })),
                { text: q.correct_answer, correct: true },
            ];

            // Antworten mischen
            for (let i = allAnswers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
            }

            return {
                question: q.question,
                answers: allAnswers,
                category: category.name,
            };
        });

        setQuestions(formattedQuestions);
        setCurrentQuestion(0);
        setSelectedAnswerIndex(null);
        setShowScore(false);
    };

    // Timer starten (alle 1 Sekunde) – außer wenn schon geantwortet wurde
    useEffect(() => {
        if (
            selectedAnswerIndex !== null ||
            showScore ||
            questions.length === 0
        ) return;

        if (timeLeft === 0) {
            handleAnswerOptionClick(null, false);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, selectedAnswerIndex, showScore, questions.length]);

    // Timer auf 20 zurücksetzen bei neuer Frage
    useEffect(() => {
        setTimeLeft(20);
    }, [currentQuestion]);

    // Benutzer wählt eine Antwort
    const handleAnswerOptionClick = (index: number | null, isCorrect: boolean): void => {
        if (selectedAnswerIndex !== null) return;

        setSelectedAnswerIndex(index);
        const updatedScore = isCorrect ? score + 1 : score;

        if (isCorrect) setScore(updatedScore);

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
                // Nächste Frage anzeigen
                setCurrentQuestion(nextQuestion);
                setSelectedAnswerIndex(null);
            } else {
                // Runde fertig → nächste oder Spielende
                if (round < 2) {
                    setRound(prev => prev + 1);
                    setSelectedCategory(null);
                    setQuestions([]);
                    setScore(updatedScore);
                } else {
                    if (updatedScore > 0) {
                        submitScoreToAPI(updatedScore);
                    }
                    setScore(updatedScore);
                    setShowScore(true);
                }
            }
        }, 1500);
    };

    // === UI-Rückgaben je nach Spielstatus ===

    if (showScore) {
        return (
            <div className="quiz">
                <div className="score-section">
                    <p>Du hast {score} von 9 Fragen richtig beantwortet!</p>
                    <button onClick={restartGame} className="start-button">
                        Erneut spielen
                    </button>
                </div>
            </div>
        );
    }

    // Kategorieauswahl vor jeder Runde
    if (!selectedCategory && availableCategories.length > 0) {
        return (
            <div className="quiz">
                <div className="category-select">
                    <h2>Wähle eine Kategorie:</h2>
                    {availableCategories.map((cat) => (
                        <button key={cat.id} onClick={() => handleCategorySelect(cat)}>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Ladeanzeige, während Fragen geladen werden
    if (questions.length === 0) {
        return <div className="quiz">Lade Fragen...</div>;
    }

    // Quiz-Anzeige mit aktueller Frage und Antworten
    return (
        <div className="quiz">
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
        </div>
    );
};

export default QuizGame;
