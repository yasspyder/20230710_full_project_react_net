import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function AuthRequire({ children }) {
  const profile = useSelector((state) => state.profile.profile);
  const location = useLocation();

  if (!profile) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }
  return children;
}

export default AuthRequire;
