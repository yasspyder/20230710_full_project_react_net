import React, { useEffect } from "react";
import { Button, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/carouselReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../store/slices/modalSlice";
import { fetchGetReviews } from "../store/slices/reviewSlice";
import { useNavigate } from "react-router-dom";

function CarouselReviews() {
  const profile = useSelector((state) => state.profile.profile);
  const reviews = useSelector((state) => state.reviews.reviews);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkHandle = () => {
    const path = "/review";
    if (profile) navigate(path);
    else {
      dispatch(
        showModal({
          reason: "authRequire",
          message: "Оставлять отзывы могут только авторизованные пользователи",
          path,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchGetReviews());
  }, [dispatch]);

  return (
    <div className="container-fluid text-center mb-5">
      <h5 className="text-primary text-uppercase mb-3">Отзывы</h5>
      <h1>Что говорят наши студенты?</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {reviews?.length ? (
            <Carousel className="owl-carousel testimonial-carousel">
              {reviews?.map((review) => (
                <Carousel.Item className="text-center">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                  <h4 className="font-weight-normal mb-4">{review.text}</h4>
                  <img
                    className="img-fluid mx-auto mb-3"
                    src={review.image}
                    alt={review.user_name + "_avatar"}
                  />
                  <h5 className="m-0">{review.user_name}</h5>
                  {/* <span>Разработчик</span> */}
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>Будь первым! Оставь отзыв о нашей школе!</p>
          )}
          <div className="text-center py-3">
            <Button onClick={linkHandle}>Написать отзыв</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselReviews;
