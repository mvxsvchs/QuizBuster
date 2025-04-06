import { useState, useEffect } from 'react';
import './QuizGame.css';
import * as axios from "axios";
import { AxiosResponse } from "axios";

interface AnswerOption {
    text: string;
    correct: boolean;
}

interface Question {
    question: string;
    answers: AnswerOption[];
    category: string;
}

interface QuestionResponse {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface Category {
    id: number;
    name: string;
}

const client = axios.default.create({
    baseURL: 'http://localhost:8000',
});

const QuizGame: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(20);

    const [round, setRound] = useState<number>(0);
    const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // ✅ Score an API senden
    const submitScoreToAPI = async (score: number) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.warn("⚠️ Kein Token gefunden – Score wird nicht gesendet.");
            return;
        }

        try {
            await client.patch("/user/score", { points: score }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("✅ Score erfolgreich übermittelt:", score);
        } catch (error) {
            console.error("❌ Fehler beim Score-Patch:", error);
        }
    };

    // ✅ Spiel neu starten
    const restartGame = () => {
        setScore(0);
        setRound(0);
        setSelectedCategory(null);
        setQuestions([]);
        setShowScore(false);
        setCurrentQuestion(0);
        setSelectedAnswerIndex(null);
    };

    useEffect(() => {
        if (round < 3 && !selectedCategory) {
            client.get('category').then((res: AxiosResponse<Category[]>) => {
                setAvailableCategories(res.data);
            });
        }
    }, [round, selectedCategory]);

    const handleCategorySelect = async (category: Category) => {
        setSelectedCategory(category);

        const res: AxiosResponse<QuestionResponse[]> = await client.get(`question?category=${category?.id}`);

        const formattedQuestions: Question[] = res.data.map((q) => {
            const allAnswers: AnswerOption[] = [
                ...q.incorrect_answers.map(ans => ({ text: ans, correct: false })),
                { text: q.correct_answer, correct: true },
            ];

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

    useEffect(() => {
        setTimeLeft(20);
    }, [currentQuestion]);

    // ✅ Korrigierte Antwort-Logik mit Score-Speicherung
    const handleAnswerOptionClick = (index: number | null, isCorrect: boolean): void => {
        if (selectedAnswerIndex !== null) return;

        setSelectedAnswerIndex(index);

        // 🎯 Den Score korrekt berechnen
        const updatedScore = isCorrect ? score + 1 : score;

        if (isCorrect) {
            setScore(updatedScore);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswerIndex(null);
            } else {
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

    // === UI ===

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

    if (questions.length === 0) {
        return <div className="quiz">Lade Fragen...</div>;
    }

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
