import { useSelector } from 'react-redux';
import CardComponent from './CardComponent';
import Sceleton from './Sceleton';

function CourseComponent({ count }) {
  const loading = useSelector((state) => state.courses.loading);
  const courses = useSelector((state) => state.courses.courses);
  const profile = useSelector((state) => state.profile.profile);

  const renderCourses = count ? courses.slice(0, count) : courses;

  return (
    <div className="container-fluid text-center">
      <h2 className="mb-5">Курсы</h2>
      {loading ? (
        <Sceleton />
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <div className="row w-100">
              {renderCourses.map(({ id, image_url, name, description }) => (
                <CardComponent
                  key={id}
                  img={image_url}
                  title={name}
                  description={description}
                  linkPath={`/courses/${id}`}
                  userRequire={profile ? false : true}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CourseComponent;
