import { useState, useEffect } from "react";
import style from "./TestComponent.module.css";
import MainCompoent from "./MainComponent/MainComponent";
import PopupComponent from "../ExerciseComponent/PopupComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchTest } from "../../store/slices/testSlice";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getCookie from "../../services/getCookie";
import { LINK_APP } from "../../config";

function TestComponent({ testId }) {
  const [counter, setCounter] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [points, setPoints] = useState(0);
  const [errors, setErrors] = useState(0);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.test);
  const loading = useSelector((state) => state.test.loading);
  const navigate = useNavigate();
  const goBack = () => navigate("/tests");

  const handleRepeat = () => {
    setIsEnd(false);
    setCounter(0);
    setPoints(0);
    setErrors(0);
    const blocks = document.querySelectorAll(".block");
    for (let block of blocks) {
      block.className = "block";
    }
  };

  useEffect(() => {
    dispatch(fetchTest(testId));
  }, [testId, dispatch]);

  useEffect(() => {
    if (isEnd) {
      if (errors === 0 && points > 0) {
        axios
          .get(
            `${LINK_APP}api/send/points?type=test&points=${points}&id=${testId}`,
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
  }, [isEnd, errors, points, testId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.main}>
          <h1 className={style.heading}>{data?.test_name}</h1>
          <MainCompoent
            questions={data?.questions}
            counter={counter}
            setCounter={setCounter}
            setIsEnd={setIsEnd}
            points={points}
            setPoints={setPoints}
            errors={errors}
            setErrors={setErrors}
          />
          {isEnd && (
            <PopupComponent
              questions={data?.questions.length}
              points={points}
              handleRepeat={handleRepeat}
              repeat={errors}
              test={true}
            />
          )}
          <button onClick={goBack} className="btn btn-primary px-4">
            Список тестов
          </button>
        </div>
      )}
    </>
  );
}

export default TestComponent;
