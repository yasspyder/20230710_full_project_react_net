import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchallLessons } from '../store/slices/allLessonsSlice';
import CardComponent from '../components/CardComponent';
import Sceleton from '../components/Sceleton';

function LessonsPage() {
  const { courseId } = useParams();
  const loading = useSelector((state) => state.allLessons.loading);
  const lessons = useSelector((state) => state.allLessons.lessons);
  const passLessons = useSelector((state) => state.allLessons.passLessons);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallLessons(courseId));
  }, [dispatch, courseId]);

  return (
    <div className="container-fluid text-center">
      <h2 className="mb-5">Уроки</h2>
      {loading ? (
        <Sceleton />
      ) : (
        <>
          {lessons.length ? (
            <>
              <div className="d-flex justify-content-center">
                <div className="row w-100">
                  {lessons.map(({ id, image, heading }) => {
                    let complete;
                    passLessons.find((passId) => passId === id) === id
                      ? (complete = true)
                      : (complete = false);
                    return (
                      <CardComponent
                        key={id}
                        img={image}
                        title={heading}
                        complete={complete}
                        linkPath={`/lessons/${id}`}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <h3 className="pb-5">
              Пока пусто, но скоро добавим. Оставайтесь с нами)
            </h3>
          )}
        </>
      )}
    </div>
  );
}

export default LessonsPage;
