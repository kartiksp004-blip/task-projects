import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

interface QuizAppProps {
  onBack: () => void;
}

const QuizApp: React.FC<QuizAppProps> = ({ onBack }) => {
  const [questions] = useState<Question[]>([
    {
      id: 1,
      question: "What is the correct way to create a component in React?",
      options: [
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = () => { return <div>Hello</div>; }",
        "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
        "All of the above"
      ],
      correctAnswer: 3,
      category: "React",
      difficulty: "easy",
      explanation: "React components can be created as function declarations, arrow functions, or class components."
    },
    {
      id: 2,
      question: "Which CSS property is used to create flexbox layouts?",
      options: ["display: flex", "layout: flexbox", "flex: true", "flexbox: enabled"],
      correctAnswer: 0,
      category: "CSS",
      difficulty: "easy",
      explanation: "The 'display: flex' property turns an element into a flex container."
    },
    {
      id: 3,
      question: "What does 'async/await' do in JavaScript?",
      options: [
        "Makes functions run faster",
        "Handles asynchronous operations more readably",
        "Creates multiple threads",
        "Prevents errors"
      ],
      correctAnswer: 1,
      category: "JavaScript",
      difficulty: "medium",
      explanation: "async/await provides a cleaner syntax for working with Promises and asynchronous code."
    },
    {
      id: 4,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      category: "Algorithms",
      difficulty: "medium",
      explanation: "Binary search eliminates half the search space in each iteration, giving O(log n) complexity."
    },
    {
      id: 5,
      question: "Which HTTP status code indicates a successful request?",
      options: ["404", "500", "200", "301"],
      correctAnswer: 2,
      category: "Web Development",
      difficulty: "easy",
      explanation: "HTTP 200 OK indicates that the request has succeeded."
    },
    {
      id: 6,
      question: "What is a closure in JavaScript?",
      options: [
        "A way to close browser windows",
        "A function that has access to outer scope variables",
        "A method to end loops",
        "A type of error handling"
      ],
      correctAnswer: 1,
      category: "JavaScript",
      difficulty: "hard",
      explanation: "A closure gives you access to an outer function's scope from an inner function."
    },
    {
      id: 7,
      question: "What does CSS Grid allow you to do?",
      options: [
        "Only create columns",
        "Only create rows",
        "Create both rows and columns simultaneously",
        "Just align text"
      ],
      correctAnswer: 2,
      category: "CSS",
      difficulty: "medium",
      explanation: "CSS Grid is a two-dimensional layout system that handles both rows and columns."
    },
    {
      id: 8,
      question: "What is the Virtual DOM in React?",
      options: [
        "A physical representation of the DOM",
        "A JavaScript representation of the actual DOM",
        "A browser API",
        "A debugging tool"
      ],
      correctAnswer: 1,
      category: "React",
      difficulty: "hard",
      explanation: "Virtual DOM is a JavaScript representation kept in memory and synced with the real DOM."
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResult]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmitQuiz = () => {
    const finalScore = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    setScore(finalScore);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setScore(0);
    setTimeLeft(300);
    setQuizStarted(false);
    setShowExplanation(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-8" />
              <h1 className="text-5xl font-bold text-gray-800 mb-6">Interactive Quiz</h1>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Test your knowledge across multiple programming topics. You have 5 minutes to complete 8 questions.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Details</h3>
                  <ul className="text-left text-gray-600 space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      8 challenging questions
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      5 minutes time limit
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Instant feedback & explanations
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Multiple programming topics
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(questions.map(q => q.category))).map((category) => (
                      <span
                        key={category}
                        className="bg-white/50 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setQuizStarted(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const getGrade = () => {
      if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', message: 'Outstanding!' };
      if (percentage >= 80) return { grade: 'A', color: 'text-green-500', message: 'Excellent!' };
      if (percentage >= 70) return { grade: 'B', color: 'text-blue-500', message: 'Good job!' };
      if (percentage >= 60) return { grade: 'C', color: 'text-yellow-500', message: 'Fair' };
      return { grade: 'F', color: 'text-red-500', message: 'Keep practicing!' };
    };

    const gradeInfo = getGrade();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 text-center">
              <Trophy className={`w-24 h-24 mx-auto mb-8 ${percentage >= 70 ? 'text-yellow-500' : 'text-gray-400'}`} />
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Quiz Complete!</h1>
              <div className={`text-8xl font-bold mb-4 ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </div>
              <p className="text-2xl text-gray-600 mb-8">{gradeInfo.message}</p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Score</h3>
                  <p className="text-4xl font-bold text-green-600">{score}/{questions.length}</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Percentage</h3>
                  <p className="text-4xl font-bold text-blue-600">{percentage.toFixed(0)}%</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Time Used</h3>
                  <p className="text-4xl font-bold text-purple-600">{formatTime(300 - timeLeft)}</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retake Quiz
                </button>
                <button
                  onClick={onBack}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Quiz Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-blue-500" />
                <span className="text-2xl font-bold text-gray-800">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Question</p>
                <p className="text-2xl font-bold text-gray-800">
                  {currentQuestionIndex + 1} / {questions.length}
                </p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{progress.toFixed(0)}% Complete</p>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {currentQuestion.category}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isWrong = showExplanation && isSelected && !isCorrect;
                
                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                      showExplanation
                        ? isCorrect
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : isWrong
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        showExplanation
                          ? isCorrect
                            ? 'border-green-500 bg-green-500 text-white'
                            : isWrong
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-gray-300 text-gray-500'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 text-gray-500'
                      }`}>
                        {showExplanation && isCorrect && <CheckCircle className="w-5 h-5" />}
                        {showExplanation && isWrong && <XCircle className="w-5 h-5" />}
                        {!showExplanation && String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && currentQuestion.explanation && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl mb-8">
                <h4 className="font-bold text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex gap-4">
                {selectedAnswers[currentQuestionIndex] !== undefined && !showExplanation && (
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
                  >
                    Show Answer
                  </button>
                )}

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;