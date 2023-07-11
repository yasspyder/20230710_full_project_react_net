import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSendReview } from "../store/slices/reviewSlice";
import { showModal } from "../store/slices/modalSlice";
import { Button, Form } from "react-bootstrap";

function AddReviewPage() {
  const [review, setReview] = useState("");
  const dispatch = useDispatch();
  const simpleValidation = () => {
    if (!review.length) {
      dispatch(
        showModal({
          message: "Необходимо заполнить форму",
        })
      );
      return false;
    } else if (review.length < 5) {
      dispatch(
        showModal({
          message: "Текст должен быть не менее 5 символов",
        })
      );
      return false;
    } else if (review.length > 455) {
      dispatch(
        showModal({
          message: "Слишком длинный текст.",
        })
      );
      return false;
    }
    return true;
  };
  const handlerSendReview = (e) => {
    e.preventDefault();
    if (simpleValidation()) {
      const data = { text: review };
      dispatch(fetchSendReview(data));
      dispatch(
        showModal({
          message: "Спасибо за ваш отзыв!",
        })
      );
      setReview("");
    }
  };
  return (
    <div className="container-fluid py-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Оставить отзыв</h2>
      <Form className="review-form">
        <Form.Group>
          <Form.Label>
            Поделитесь вашим мнение о нас. Нам очень важна обратная связь, чтобы
            стать лучшей платформой обучения для вас
          </Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          onClick={handlerSendReview}
          className="form-review-btn"
        >
          Отправить
        </Button>
      </Form>
    </div>
  );
}

export default AddReviewPage;
