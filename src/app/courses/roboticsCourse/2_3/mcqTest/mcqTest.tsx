"use client";

import { useState, useEffect } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // Index of correct option
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which of the following is NOT a type of electricity?",
    options: [
      "Static Electricity",
      "Alternating Electricity",
      "Magnetic Electricity",
    ],
    answer: 2,
  },
  {
    id: 2,
    question: "What happens when a circuit is open?",
    options: [
      "Current flows continuously",
      "Current stops flowing",
      "Voltage increases indefinitely",
    ],
    answer: 1,
  },
  {
    id: 3,
    question: "What is the main function of a capacitor in a circuit?",
    options: [
      "To store electrical energy and release it when needed",
      "To convert electrical energy into heat energy",
      "To control the flow of electrons",
    ],
    answer: 0,
  },
  {
    id: 4,
    question: "What is the SI unit of electrical resistance?",
    options: ["Ampere", "Volt", "Ohm"],
    answer: 2,
  },
  {
    id: 5,
    question: "Which of the following is an electrical device?",
    options: ["Bulb", "Smartphone", "Remote control"],
    answer: 0,
  },
  {
    id: 6,
    question: "Why is a resistor used in a circuit with an LED?",
    options: [
      "To increase current flow",
      "To decrease voltage to protect the LED",
      "To store energy",
    ],
    answer: 1,
  },
];

const TestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1),
  );
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });

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

  const handleAnswer = (optionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const toggleMarkForReview = () => {
    if (markedForReview.includes(currentQuestion)) {
      setMarkedForReview(markedForReview.filter((q) => q !== currentQuestion));
    } else {
      setMarkedForReview([...markedForReview, currentQuestion]);
    }
  };

  const submitTest = () => {
    const correctAnswers = questions.reduce(
      (acc, question, index) =>
        acc + (answers[index] === question.answer ? 1 : 0),
      0,
    );
    const incorrectAnswers = questions.length - correctAnswers;
    setScore({ correct: correctAnswers, incorrect: incorrectAnswers });
    setShowResults(true);
    document.exitFullscreen();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const startTest = () => {
    setIsTestStarted(true);
    document.documentElement.requestFullscreen();
  };

  const resetTest = () => {
    setIsTestStarted(false);
    setShowResults(false);
    setCurrentQuestion(0);
    setMarkedForReview([]);
    setAnswers(Array(questions.length).fill(-1));
    setTimeLeft(900);
    document.exitFullscreen();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      {showResults ? (
        <div className="w-full max-w-2xl rounded-lg bg-gray-200 p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">Test Results</h1>
          <p className="mb-4 text-2xl">
            Percentage: {((score.correct / questions.length) * 100).toFixed(2)}%
          </p>
          <p className="mb-4 text-xl">Correct Answers: {score.correct}</p>
          <p className="mb-4 text-xl">Incorrect Answers: {score.incorrect}</p>
          <button
            onClick={resetTest}
            className="mt-6 w-full rounded bg-blue-500 px-6 py-3 text-xl text-white hover:bg-blue-600"
          >
            Back to Start
          </button>
        </div>
      ) : !isTestStarted ? (
        <div className="w-full max-w-2xl rounded-lg bg-gray-200 p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">Welcome to the Quiz Test</h1>
          <button
            onClick={startTest}
            className="mt-6 w-full rounded bg-green-500 px-6 py-3 text-xl text-white hover:bg-green-600"
          >
            Start Test
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl rounded-lg bg-gray-200 p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              Time Left: {formatTime(timeLeft)}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left side: Question */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">
                Question {currentQuestion + 1}
              </h2>
              <p className="mb-6 text-2xl">
                {questions[currentQuestion]?.question}
              </p>
            </div>

            {/* Right side: Options */}
            <div className="space-y-4">
              {questions[currentQuestion]?.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex cursor-pointer items-center rounded-lg border p-4 text-2xl ${
                    answers[currentQuestion] === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => handleAnswer(index)}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    className="mr-4 h-6 w-6"
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleAnswer(index)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={toggleMarkForReview}
              className={`rounded px-6 py-3 text-xl ${
                markedForReview.includes(currentQuestion)
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {markedForReview.includes(currentQuestion)
                ? "Unmark"
                : "Mark for Review"}
            </button>

            <div className="space-x-4">
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="rounded bg-gray-300 px-6 py-3 text-xl hover:bg-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={currentQuestion === questions.length - 1}
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="rounded bg-gray-300 px-6 py-3 text-xl hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {currentQuestion === questions.length - 1 && (
            <button
              onClick={submitTest}
              className="mt-8 w-full rounded bg-green-500 px-6 py-3 text-xl text-white hover:bg-green-600"
            >
              Submit Test
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TestPage;
