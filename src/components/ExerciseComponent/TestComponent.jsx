import { useEffect, useState } from "react";
import style from "./TestComponent.module.css";

const ExerciseComponent = ({
  data,
  counter,
  setCounter,
  setIsEnd,
  setPoints,
  points,
  setRepeat,
}) => {
  const questionArr = data[counter].value.split("()");
  const [answer, setAnswer] = useState("");
  const [erros, setErrors] = useState(false);
  const [wrongs, setWrongs] = useState([]);

  const handleNext = () => {
    if (counter < data.length - 1) {
      let buttons = document.querySelectorAll(".answer");
      for (let button of buttons) {
        button.className = "answer";
      }
      setCounter(counter + 1);
      setErrors(false);
      setAnswer("");
    } else {
      setRepeat(wrongs);
      setIsEnd(true);
    }
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    const blocks = document.querySelectorAll(".block");

    if (e.target.value === data[counter].correct_answer) {
      for (let block of blocks) {
        if (+block.id === counter) {
          if (!block.classList.contains("wrong")) {
            block.classList.add("correct");
          }
        }
      }
      setAnswer(e.target.value);
      if (!erros) {
        setPoints(points + 1);
      }
      let wrongButtons = document.querySelectorAll(".btn-wrong");
      for (let button of wrongButtons) {
        button.classList.remove("btn-wrong");
      }
      e.target.classList.remove("btn-wrong");
      setTimeout(handleNext, 1000);
    } else {
      for (let block of blocks) {
        if (+block.id === counter) block.classList.add("wrong");
      }
      e.target.classList.add("btn-wrong");
      setWrongs([...wrongs, data[counter]]);
      setErrors(true);
    }
  };

  useEffect(() => {
    let blocks = document.querySelectorAll(".block");
    for (let block of blocks) {
      if (+block.id === counter) {
        block.classList.add("active");
      } else {
        block.classList.remove("active");
      }
    }
  }, [counter]);

  return (
    <div className={style.wrapper}>
      <div className="indicators">
        {data.map((item, index) => (
          <div className="block" id={index} key={index}></div>
        ))}
      </div>
      <div className={style.topBar}>
        <div className={style.heading}>Выберите правильный ответ</div>
        <div className={style.counter}>
          Вопрос {counter + 1} из {data.length}
        </div>
      </div>
      <form className={style.form} id="myForm">
        <div className={style.question}>
          {questionArr[0]}
          <input type="text" value={answer} readOnly />
          {questionArr[1]}
        </div>
        <div className={style.buttons}>
          {data[counter].answers.split(",").map((item, index) => {
            return (
              <button
                id="btn_answer"
                className="answer"
                key={index}
                value={item}
                onClick={handleAnswer}
              >
                {item}
              </button>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default ExerciseComponent;
