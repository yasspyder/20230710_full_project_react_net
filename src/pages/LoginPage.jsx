import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/profileSlice';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fromPage = location.state?.from || '/';

  useEffect(() => {
    if (profile) {
      navigate(fromPage);
    }
  }, [profile, navigate, fromPage]);

  const emailHandle = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandle = (e) => {
    setPassword(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="card p-3" style={{ width: 500 }}>
          <Form onSubmit={submitHandle}>
            <h5 className="text-primary mb-3">
              Для продолжения необходимо войти
            </h5>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={emailHandle}
                value={email}
                type="email"
                placeholder="Введите email"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                onChange={passwordHandle}
                value={password}
                type="password"
                placeholder="Введите пароль"
              />
              {error && (
                <span
                  className="mt-2"
                  style={{ display: 'block', color: 'red' }}
                >
                  {error[0]}
                </span>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Войти
            </Button>
            <Form.Group className="mt-3">
              <Link to="/auth/register" state={{ from: fromPage }}>
                Нет аккаунта? Зарегистрироваться
              </Link>
            </Form.Group>
            <Form.Group className="mt-3">
              <Link to="/">На главную</Link>
            </Form.Group>
          </Form>
        </div>
      )}
    </>
  );
}

export default LoginPage;
