import MainCarousel from '../components/MainCarousel';
import CarouselReviews from '../components/CarouselReviews';
import Courses from '../components/Courses';

function Homepage() {
  return (
    <>
      <MainCarousel />
      <div className="container-fluid text-center py-5">
        <h2>Добро пожаловать на сайт BrisklyLearn!</h2>
        <p>
          Добро пожаловать на путь знаний и новых возможностей! Проходите
          бесплатную регистрацию и в Вашем личном кабинете будет доступна
          полезная информация, а также есть ответы на интересующие Вас вопросы.
          В папке «Полезности» вы получите записи прямых эфиров и бесплатные
          вебинары: — Плюсы и минусы онлайн-обучения; — «Удаленное обучение» и
          др.;
        </p>
      </div>
      <Courses count={3} />
      <CarouselReviews />
    </>
  );
}

export default Homepage;
