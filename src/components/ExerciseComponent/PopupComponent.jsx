import declension from "../../services/declension";

const PopupComponent = ({ points, questions, handleRepeat, repeat, test }) => {
  const handleOnClick = () => {
    const popup = document.querySelector(".popup");
    popup.classList.add("hidden");
    handleRepeat();
  };
  const hadleClosePopup = () => {
    const popup = document.querySelector(".popup");
    popup.classList.add("hidden");
  };
  return (
    <div className="popup">
      {(repeat.length === undefined ? repeat !== 0 : repeat.length !== 0) ? (
        <>
          <p>Вы завершили {test ? "тест" : "упражнение"}!</p>
          <p>
            Но у вас есть ошибки.
            {test ? "" : "Чтобы пройти урок, завершите упражнение без ошибок."}
          </p>
          <p>
            Вы набрали: {declension(points, ["балл", "балла", "баллов"])} из{" "}
            {questions}.
          </p>
          <button onClick={handleOnClick}>Пройти повторно</button>
          <button className="close" onClick={hadleClosePopup}>
            {"✖"}
          </button>
        </>
      ) : (
        <>
          <p>Поздравляем!</p>
          <p>Вы завершили {test ? "тест" : "упражнение"} без ошибок!</p>
          <p>
            Вы набрали: {declension(points, ["балл", "балла", "баллов"])} из{" "}
            {questions}.
          </p>
          <button className="close" onClick={hadleClosePopup}>
            {"✖"}
          </button>
        </>
      )}
    </div>
  );
};
export default PopupComponent;
