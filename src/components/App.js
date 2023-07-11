import { Routes, Route } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import Layout from "./Layout";
import routes from "../routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../store/slices/coursesSlice";


function App() {
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!courses.length) dispatch(fetchCourses());
  }, [courses, dispatch]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        {routes.auth.map((route) => (
          <Route key={route.name} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="/" element={<Layout />}>
        {routes.general.map((route) => (
          <Route key={route.name} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
