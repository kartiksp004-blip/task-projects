import React, { useState, useEffect } from 'react';
import { Brain, Clock, Trophy, CheckCircle, XCircle, RotateCcw, Star, Target, Zap } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

function App() {
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
      explanation: "React components can be created as function declarations, arrow functions, or class components. All three approaches are valid ways to create React components."
    },
    {
      id: 2,
      question: "Which CSS property is used to create flexbox layouts?",
      options: ["display: flex", "layout: flexbox", "flex: true", "flexbox: enabled"],
      correctAnswer: 0,
      category: "CSS",
      difficulty: "easy",
      explanation: "The 'display: flex' property turns an element into a flex container, enabling flexbox layout for its children."
    },
    {
      id: 3,
      question: "What does 'async/await' do in JavaScript?",
      options: [
        "Makes functions run faster",
        "Handles asynchronous operations more readably",
        "Creates multiple threads",
        "Prevents all errors"
      ],
      correctAnswer: 1,
      category: "JavaScript",
      difficulty: "medium",
      explanation: "async/await provides a cleaner, more readable syntax for working with Promises and handling asynchronous operations in JavaScript."
    },
    {
      id: 4,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      category: "Algorithms",
      difficulty: "medium",
      explanation: "Binary search eliminates half the search space in each iteration, resulting in O(log n) time complexity."
    },
    {
      id: 5,
      question: "Which HTTP status code indicates a successful request?",
      options: ["404", "500", "200", "301"],
      correctAnswer: 2,
      category: "Web Development",
      difficulty: "easy",
      explanation: "HTTP 200 OK indicates that the request has succeeded and the server has returned the requested data."
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
      explanation: "A closure gives you access to an outer function's scope from an inner function, allowing the inner function to access variables from the outer scope even after the outer function has returned."
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
      explanation: "CSS Grid is a two-dimensional layout system that allows you to work with both rows and columns simultaneously, providing powerful layout capabilities."
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
      explanation: "The Virtual DOM is a JavaScript representation of the actual DOM kept in memory and synced with the real DOM through a process called reconciliation."
    },
    {
      id: 9,
      question: "Which method is used to add an element to the end of an array in JavaScript?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: 1,
      category: "JavaScript",
      difficulty: "easy",
      explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
    },
    {
      id: 10,
      question: "What is the purpose of the 'key' prop in React lists?",
      options: [
        "To style list items",
        "To help React identify which items have changed",
        "To sort the list",
        "To make items clickable"
      ],
      correctAnswer: 1,
      category: "React",
      difficulty: "medium",
      explanation: "The 'key' prop helps React identify which items have changed, are added, or are removed, enabling efficient re-rendering of list components."
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showResult) {
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
    if (showExplanation) return;
    
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
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResult(false);
    setScore(0);
    setTimeLeft(600);
    setQuizStarted(false);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredQuestions = selectedAnswers.filter(answer => answer !== null).length;

  // Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Brain className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-6xl font-bold text-gray-800 mb-6">
                Interactive Quiz
              </h1>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
                Test your programming knowledge with our comprehensive quiz covering React, JavaScript, 
                CSS, algorithms, and web development concepts.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border border-blue-200/50">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">10 Questions</h3>
                  <p className="text-gray-600">Carefully crafted questions across multiple topics</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-6 border border-purple-200/50">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">10 Minutes</h3>
                  <p className="text-gray-600">Timed challenge to test your quick thinking</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-200/50">
                  <Zap className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Instant Feedback</h3>
                  <p className="text-gray-600">Get explanations for every answer</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Quiz Categories</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {Array.from(new Set(questions.map(q => q.category))).map((category) => (
                    <span
                      key={category}
                      className="bg-white/60 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200/50"
                    >
                      {category}
                    </span>
                  ))}
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

  // Results Screen
  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const getGrade = () => {
      if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'from-green-500/10 to-green-600/10', message: 'Outstanding! You\'re a programming expert!' };
      if (percentage >= 80) return { grade: 'A', color: 'text-green-500', bg: 'from-green-500/10 to-green-600/10', message: 'Excellent work! You have strong knowledge.' };
      if (percentage >= 70) return { grade: 'B', color: 'text-blue-500', bg: 'from-blue-500/10 to-blue-600/10', message: 'Good job! You\'re on the right track.' };
      if (percentage >= 60) return { grade: 'C', color: 'text-yellow-500', bg: 'from-yellow-500/10 to-yellow-600/10', message: 'Fair performance. Keep practicing!' };
      return { grade: 'F', color: 'text-red-500', bg: 'from-red-500/10 to-red-600/10', message: 'Don\'t give up! Practice makes perfect.' };
    };

    const gradeInfo = getGrade();
    const timeUsed = 600 - timeLeft;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 text-center">
              <div className={`w-32 h-32 bg-gradient-to-br ${gradeInfo.bg} rounded-full flex items-center justify-center mx-auto mb-8 border-4 ${percentage >= 70 ? 'border-green-200' : 'border-gray-200'}`}>
                <Trophy className={`w-16 h-16 ${percentage >= 70 ? 'text-yellow-500' : 'text-gray-400'}`} />
              </div>
              
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Quiz Complete!</h1>
              <div className={`text-8xl font-bold mb-4 ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </div>
              <p className="text-2xl text-gray-600 mb-8">{gradeInfo.message}</p>
              
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border border-blue-200/50">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Score</h3>
                  <p className="text-3xl font-bold text-blue-600">{score}/{questions.length}</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-6 border border-purple-200/50">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Percentage</h3>
                  <p className="text-3xl font-bold text-purple-600">{percentage.toFixed(0)}%</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-200/50">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Time Used</h3>
                  <p className="text-3xl font-bold text-green-600">{formatTime(timeUsed)}</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-2xl p-6 border border-yellow-200/50">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Accuracy</h3>
                  <p className="text-3xl font-bold text-yellow-600">{answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0}%</p>
                </div>
              </div>

              <div className="bg-gray-50/80 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {Array.from(new Set(questions.map(q => q.category))).map((category) => {
                    const categoryQuestions = questions.filter(q => q.category === category);
                    const categoryScore = categoryQuestions.reduce((acc, q, index) => {
                      const questionIndex = questions.findIndex(question => question.id === q.id);
                      return acc + (selectedAnswers[questionIndex] === q.correctAnswer ? 1 : 0);
                    }, 0);
                    const categoryPercentage = (categoryScore / categoryQuestions.length) * 100;
                    
                    return (
                      <div key={category} className="text-center">
                        <p className="font-medium text-gray-700">{category}</p>
                        <p className="text-2xl font-bold text-blue-600">{categoryScore}/{categoryQuestions.length}</p>
                        <p className="text-xs text-gray-500">{categoryPercentage.toFixed(0)}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retake Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Quiz Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time Remaining</p>
                  <p className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-gray-800'}`}>
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-2xl font-bold text-gray-800">
                  {currentQuestionIndex + 1} / {questions.length}
                </p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>{progress.toFixed(0)}% Complete</span>
              <span>{answeredQuestions} / {questions.length} Answered</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700 border border-green-200' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                  'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {currentQuestion.difficulty.toUpperCase()}
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                  {currentQuestion.category}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 leading-relaxed mb-2">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isWrong = showExplanation && isSelected && !isCorrect;
                const showCorrect = showExplanation && isCorrect;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                      showExplanation
                        ? showCorrect
                          ? 'border-green-500 bg-green-50 text-green-800 shadow-lg'
                          : isWrong
                          ? 'border-red-500 bg-red-50 text-red-800 shadow-lg'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-lg transform scale-[1.02]'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md hover:transform hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        showExplanation
                          ? showCorrect
                            ? 'border-green-500 bg-green-500 text-white'
                            : isWrong
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-gray-300 bg-gray-100 text-gray-500'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 bg-white text-gray-500'
                      }`}>
                        {showExplanation ? (
                          showCorrect ? <CheckCircle className="w-5 h-5" /> :
                          isWrong ? <XCircle className="w-5 h-5" /> :
                          String.fromCharCode(65 + index)
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="text-lg leading-relaxed">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-2xl mb-8 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 mb-2">Explanation</h4>
                    <p className="text-blue-700 leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
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
                {selectedAnswers[currentQuestionIndex] !== null && !showExplanation && (
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Show Answer
                  </button>
                )}

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;