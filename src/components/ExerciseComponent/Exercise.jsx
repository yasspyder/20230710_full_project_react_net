import TestComponent from "./TestComponent";
import "../../styles/index.scss";
import { useEffect, useState } from "react";
import PopupComponent from "./PopupComponent";
import axios from "axios";
import getCookie from "../../services/getCookie";
import { LINK_APP } from "../../config";

function Exercise({ questions, lessonId }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [counter, setCounter] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [points, setPoints] = useState(0);
  const [repeat, setRepeat] = useState([]);

  useEffect(() => {
    if (questions) {
      setLoading(false);
      setData(questions);
    }
  }, [questions]);

  useEffect(() => {
    if (isEnd) {
      if (repeat.length === 0 && points > 0) {
        axios
          .get(
            `${LINK_APP}api/send/points?type=lesson&points=${points}&id=${lessonId}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getCookie("api")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.success) {
              const spanId = document.getElementById("points");
              spanId.innerText = response.data.profile.points;
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, [isEnd, repeat, points, lessonId]);

  const handleRepeat = () => {
    setIsEnd(false);
    setCounter(0);
    setPoints(0);
    const blocks = document.querySelectorAll(".block");
    for (let block of blocks) {
      block.className = "block";
    }
  };

  return (
    <>
      {!loading && (
        <div className="exercise">
          <TestComponent
            data={data}
            counter={counter}
            setCounter={setCounter}
            setIsEnd={setIsEnd}
            setPoints={setPoints}
            points={points}
            setRepeat={setRepeat}
          />
          {isEnd && (
            <PopupComponent
              questions={data.length}
              points={points}
              handleRepeat={handleRepeat}
              repeat={repeat}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Exercise;
