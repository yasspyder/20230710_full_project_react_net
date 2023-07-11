// auth
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

// general
import AuthRequire from "./hoc/AuthRequire";
import LessonsPage from "./pages/LessonsPage";
import CoursesPage from "./pages/CoursesPage";
import TestsPage from "./pages/TestsPage";
import ArticlesPage from "./pages/ArticlesPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import SingleLessonPage from "./pages/SingleLessonPage";
import SingleTestPage from "./pages/SingleTestPage";
import ProfilePage from "./pages/ProfilePage";
import SingleArticlePage from "./pages/SingleArticlePage";
import NotFoundPage from "./pages/NotFoundPage";
import Homepage from "./pages/HomePage";
import DictionaryPage from "./pages/DictionaryPage";
import AddReviewPage from "./pages/AddReviewPage";
import PolicyPage from './pages/PolicyPage';

const routes = {
  auth: [
    {
      name: "registration",
      path: "/auth/register",
      element: <RegisterPage />,
    },
    {
      name: "login",
      path: "/auth/login",
      element: <LoginPage />,
    },
  ],
  general: [
    {
      name: "notFound",
      path: "*",
      element: <NotFoundPage />,
    },
    {
      name: "home",
      path: "/",
      element: <Homepage />,
    },
    {
      name: "courses",
      path: "/courses",
      element: <CoursesPage />,
    },
    {
      name: "lessons",
      path: "/courses/:courseId",
      element: <AuthRequire children={<LessonsPage />} />,
    },
    {
      name: "lesson",
      path: "/lessons/:id",
      element: <AuthRequire children={<SingleLessonPage />} />,
    },
    {
      name: "tests",
      path: "/tests",
      element: <TestsPage />,
    },
    {
      name: "test",
      path: "/tests/:id",
      element: <SingleTestPage />,
    },
    {
      name: "articles",
      path: "/articles",
      element: <ArticlesPage />,
    },
    {
      name: "article",
      path: "/articles/:id",
      element: <SingleArticlePage />,
    },
    {
      name: "about",
      path: "/about",
      element: <AboutPage />,
    },
    {
      name: "contacts",
      path: "/contacts",
      element: <ContactsPage />,
    },
    {
      name: "profile",
      path: "/profile",
      element: <AuthRequire children={<ProfilePage />} />,
    },
    {
      name: "dictionary",
      path: "/dictionary",
      element: <AuthRequire children={<DictionaryPage />} />,
    },
    {
      name: "review",
      path: "/review",
      element: <AuthRequire children={<AddReviewPage />} />,
    },
    {
      name: "policy",
      path: "/policy",
      element: <PolicyPage />,
    },
  ],
};

export default routes;
