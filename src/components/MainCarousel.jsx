import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MainCarousel() {
  return (
    <div className="d-none d-lg-block">
      <Carousel controls={false} fade>
        <Carousel.Item>
          <img
            className="position-relative w-100"
            src="img/carousel-1.jpg"
            style={{ minHeight: '300px', objectFit: 'cover' }}
            alt=""
          />
          <Carousel.Caption className="d-flex align-items-center justify-content-center">
            <div className="p-5" style={{ width: '100%', maxWidth: '900px' }}>
              <h5 className="text-white text-uppercase mb-md-3">
                Интересные Онлайн-курсы
              </h5>
              <h1 className="display-3 text-white mb-md-4">
                Современные практики онлайн
              </h1>
              <Link
                to="/courses"
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                Хочу узнать больше
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="position-relative w-100"
            src="img/carousel-2.jpg"
            style={{ minHeight: '300px', objectFit: 'cover' }}
            alt=""
          />
          <Carousel.Caption className="d-flex align-items-center justify-content-center">
            <div className="p-5" style={{ width: '100%', maxWidth: '900px' }}>
              <h5 className="text-white text-uppercase mb-md-3">
                Увлекательные Онлайн Тесты
              </h5>
              <h1 className="display-3 text-white mb-md-4">
                Удобная Online Платформа
              </h1>
              <Link
                to="/tests"
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                Перейти к тестам
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="position-relative w-100"
            src="img/carousel-3.jpg"
            style={{ minHeight: '300px', objectFit: 'cover' }}
            alt=""
          />
          <Carousel.Caption className="d-flex align-items-center justify-content-center">
            <div className="p-5" style={{ width: '100%', maxWidth: '900px' }}>
              <h5 className="text-white text-uppercase mb-md-3">
                Только на нашей платформе
              </h5>
              <h1 className="display-3 text-white mb-md-4">
                Большая библиотека статей по разным тематикам
              </h1>
              <Link
                to="/articles"
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
              >
                Читать статьи
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default MainCarousel;
