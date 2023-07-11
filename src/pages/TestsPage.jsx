import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTests } from '../store/slices/allTestsSlice';
import CardComponent from '../components/CardComponent';
import Sceleton from '../components/Sceleton';

function TestsPage() {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.tests.tests);
  const loading = useSelector((state) => state.tests.loading);

  useEffect(() => {
    if (!tests.length) dispatch(fetchTests());
  }, [tests, dispatch]);

  return (
    <div className="container-fluid text-center">
      <h2 className="mb-5">Тесты</h2>
      {loading ? (
        <Sceleton />
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <div className="row w-100">
              {tests.map(({ id, image_url, name }) => {
                return (
                  <CardComponent
                    key={id}
                    img={image_url}
                    title={name}
                    linkPath={`/tests/${id}`}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TestsPage;
