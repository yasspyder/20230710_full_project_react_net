import { useEffect } from 'react';
import './MainComponent.css';

function MainCompoent({
  questions,
  counter,
  setCounter,
  points,
  setPoints,
  setIsEnd,
  errors,
  setErrors,
}) {
  useEffect(() => {
    let blocks = document.querySelectorAll('.block');
    for (let block of blocks) {
      if (+block.id === counter) {
        block.classList.add('active');
      } else {
        block.classList.remove('active');
      }
    }
  }, [counter]);

  const handleSkipQuestion = () => {
    if (counter < questions.length - 1) {
      const blocks = document.querySelectorAll('.block');

      for (let block of blocks) {
        if (+block.id === counter) block.classList.add('wrong');
      }
      setErrors(errors + 1);
      setCounter(counter + 1);
    } else {
      setIsEnd(true);
    }
  };

  const handleCheckAnswer = (e) => {
    e.preventDefault();

    const blocks = document.querySelectorAll('.block');
    if (e.target.innerText === questions[counter].correct_answer) {
      for (let block of blocks) {
        if (+block.id === counter) block.classList.add('correct');
      }
      setPoints(points + 1);
    } else {
      for (let block of blocks) {
        if (+block.id === counter) block.classList.add('wrong');
      }
      setErrors(errors + 1);
    }
    if (counter < questions.length - 1) {
      setCounter(counter + 1);
    } else {
      setIsEnd(true);
    }
  };

  return (
    <div className="main-container">
      <div className="indicators">
        {questions?.map((item, index) => {
          if (index === 0) {
            return <div className="block active" id={index} key={index}></div>;
          }
          return <div className="block" id={index} key={index}></div>;
        })}
      </div>
      <div className="test-block">
        <h4 className="counter">
          {counter + 1}/{questions?.length}
        </h4>
        <h3 className="question">
          {questions ? questions[counter].value : ''}
        </h3>
        <div className="row">
          <div className="col-md-6 d-md-flex m-fl">
            <div className="image-container">
              <img src={questions ? questions[counter].image_url : ''} alt="" />
            </div>
          </div>
          <div className="col-md-6 d-md-flex m-fl">
            <ul className="answers-box">
              {questions
                ? questions[counter].answers.split(',').map((answer, index) => (
                    <li
                      className="answer-item"
                      key={index}
                      onClick={handleCheckAnswer}
                    >
                      {answer}
                    </li>
                  ))
                : ''}
            </ul>
          </div>
        </div>
      </div>
      <button className="skip" onClick={handleSkipQuestion}>
        Пропустить вопрос
      </button>
    </div>
  );
}

export default MainCompoent;
