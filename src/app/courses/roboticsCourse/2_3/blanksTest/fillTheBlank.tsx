"use client";

import { useState, useEffect } from "react";

interface Question {
  id: number;
  question: string;
  answer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "The capital of France is _____",
    answer: "Paris",
  },
  {
    id: 2,
    question: "The chemical symbol for water is _____",
    answer: "H2O",
  },
  {
    id: 3,
    question: "The largest planet in our solar system is _____",
    answer: "Jupiter",
  },
  {
    id: 4,
    question: "Photosynthesis occurs in the _____ of a plant cell.",
    answer: "chloroplast",
  },
  {
    id: 5,
    question: "_____ wrote the play 'Romeo and Juliet.'",
    answer: "Shakespeare",
  },
];

const BlanksTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill(""),
  );
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });

  // Timer logic
  useEffect(() => {
    if (isTestStarted) {
      if (timeLeft <= 0) {
        submitTest();
      } else {
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
      }
    }
  }, [timeLeft, isTestStarted]);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You cannot exit fullscreen mode during the test.");
        document.documentElement.requestFullscreen();
      }
    };

    if (isTestStarted) {
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isTestStarted]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const submitTest = () => {
    const correctAnswers = questions.reduce(
      (acc, question, index) =>
        acc +
        (answers[index]?.trim().toLowerCase() === question.answer.toLowerCase()
          ? 1
          : 0),
      0,
    );
    const incorrectAnswers = questions.length - correctAnswers;
    setScore({ correct: correctAnswers, incorrect: incorrectAnswers });
    setShowResults(true);
    document.exitFullscreen();
  };

  const startTest = () => {
    setIsTestStarted(true);
    document.documentElement.requestFullscreen();
  };

  const resetTest = () => {
    setIsTestStarted(false);
    setShowResults(false);
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(""));
    setTimeLeft(900);
    document.exitFullscreen();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      {showResults ? (
        <div className="w-full max-w-2xl rounded-lg bg-gray-200 p-6 shadow-md">
          <h1 className="mb-4 text-xl font-semibold">Test Results</h1>
          <p className="mb-2">
            Percentage: {((score.correct / questions.length) * 100).toFixed(2)}%
          </p>
          <p className="mb-2">Correct Answers: {score.correct}</p>
          <p className="mb-2">Incorrect Answers: {score.incorrect}</p>
          <button
            onClick={resetTest}
            className="mt-6 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Back to Start
          </button>
        </div>
      ) : !isTestStarted ? (
        <div className="w-full max-w-2xl rounded-lg bg-gray-200 p-6 shadow-md">
          <h1 className="mb-4 text-xl font-semibold">
            Welcome to the Fill in the Blanks Test
          </h1>
          <button
            onClick={startTest}
            className="mt-6 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Start Test
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl rounded-lg bg-gray-200 p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-bold">
              Time Left: {formatTime(timeLeft)}
            </h1>
          </div>

          <h2 className="mb-4 text-xl font-semibold">
            Question {currentQuestion + 1}
          </h2>
          <p className="mb-4">{questions[currentQuestion]?.question}</p>
          <input
            type="text"
            value={answers[currentQuestion]}
            onChange={handleAnswerChange}
            className="mb-4 w-full rounded border p-2"
            placeholder="Type your answer here"
          />

          <div className="mt-6 flex justify-between">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={currentQuestion === questions.length - 1}
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {currentQuestion === questions.length - 1 && (
            <button
              onClick={submitTest}
              className="mt-6 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Submit Test
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlanksTest;
