import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Exercise from '../components/ExerciseComponent/Exercise';
import { fetchLesson } from '../store/slices/lessonSlice';
import Loader from '../components/Loader';

function SingleLessonPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.lesson.loading);
  const lesson = useSelector((state) => state.lesson.lesson);
  const html = { __html: lesson?.lesson.text };
  const courseId = lesson?.lesson.course_id;
  const goBack = () => navigate(`/courses/${courseId}`);

  useEffect(() => {
    dispatch(fetchLesson(id));
  }, [dispatch, id]);

  return (
    <div className="container-fluid text-center py-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mb-5">{lesson?.lesson.heading}</h2>
          <div dangerouslySetInnerHTML={html}></div>
          <div className="video_container">
            <h2 className="mb-5">Видеоурок</h2>
            <iframe
              width="560"
              height="315"
              src={lesson?.lesson.video_link}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <h2 className="mb-5">Упражнения для закрепления материала</h2>
          <Exercise questions={lesson?.questions} lessonId={id} />
          <button onClick={goBack} className="btn btn-primary px-4">
            Список уроков
          </button>
        </>
      )}
    </div>
  );
}

export default SingleLessonPage;
