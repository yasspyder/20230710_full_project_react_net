import './english-quiz.css';

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class EnglishQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          question: 'Как переводится "apple" на русский?',
          options: ['Яблоко', 'Груша', 'Банан', 'Апельсин'],
          answer: 'Яблоко',
        },
        {
          question: 'Как переводится "car" на русский?',
          options: ['Машина', 'Велосипед', 'Поезд', 'Самолет'],
          answer: 'Машина',
        },
        {
          question: 'Как переводится "cat" на русский?',
          options: ['Кошка', 'Собака', 'Мышь', 'Корова'],
          answer: 'Кошка',
        },
        {
          question: 'Как переводится "house" на русский?',
          options: ['Дом', 'Квартира', 'Отель', 'Хижина'],
          answer: 'Дом',
        },
      ],
      shuffledQuestions: [],
      currentQuestion: 0,
      userAnswers: [],
      showResults: false,
    };
  }

  componentDidMount() {
    this.shuffleQuestions();
  }

  shuffleQuestions = () => {
    const { questions } = this.state;
    const shuffledQuestions = questions.map((question) => {
      const options = [...question.options].sort(() => Math.random() - 0.5);
      return { ...question, options };
    });
    this.setState({
      shuffledQuestions,
    });
  };

  handleAnswer = (option) => {
    const { currentQuestion, userAnswers } = this.state;
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = option;

    this.setState({
      userAnswers: updatedAnswers,
    });
  };

  goToNextQuestion = () => {
    const { currentQuestion, shuffledQuestions } = this.state;

    if (currentQuestion < shuffledQuestions.length - 1) {
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    } else {
      this.setState({
        showResults: true,
      });
    }
  };

  render() {
    const { shuffledQuestions, currentQuestion, userAnswers, showResults } =
      this.state;

    if (showResults) {
      let correctAnswers = 0;
      let incorrectAnswers = [];

      shuffledQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
          correctAnswers++;
        } else {
          incorrectAnswers.push({
            question: question.question,
            userAnswer: userAnswers[index],
            correctAnswer: question.answer,
          });
        }
      });

      const resultMessage = `Вы ответили правильно на ${correctAnswers} вопросов. Неправильные ответы: ${
        incorrectAnswers.length > 0
          ? incorrectAnswers.map((answer) => `"${answer.question}"`)
          : 'отсутствуют'
      }`;

      return (
        <div className="container">
          <h2>Результаты</h2>
          <p>{resultMessage}</p>
          {incorrectAnswers.length > 0 && (
            <div>
              {' '}
              <h4>Неправильные ответы:</h4>
              {incorrectAnswers.map((answer, index) => (
                <div key={index}>
                  <p>Вопрос: {answer.question}</p>
                  <p>Ваш ответ: {answer.userAnswer}</p>
                  <p>Правильный ответ: {answer.correctAnswer}</p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
          >
            Пройти тест заново
          </button>
        </div>
      );
    }

    const currentQuestionObj = shuffledQuestions[currentQuestion];

    return (
      <div className="container">
        <h2>Тест по английскому языку</h2>
        <div className="question">
          <h4 className="h4-test">
            {currentQuestionObj && currentQuestionObj.question}
          </h4>
        </div>
        <div className="options">
          {currentQuestionObj &&
            currentQuestionObj.options.map((option, index) => (
              <button
                key={index}
                onClick={() => this.handleAnswer(option)}
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                {option}
              </button>
            ))}
        </div>
        <button
          onClick={this.goToNextQuestion}
          className="btn btn-primary test"
        >
          Далее
        </button>
      </div>
    );
  }
}

export default EnglishQuiz;
