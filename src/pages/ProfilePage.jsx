import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  getProfile,
  editProfile,
  buyAvatar,
} from "../store/slices/profileSlice";
import { showModal } from "../store/slices/modalSlice";
import AvatarsSlider from "../components/AvatarsSlider";

function ProfilePage() {
  const loading = useSelector((state) => state.profile.loading);
  const profilePageData = useSelector((state) => state.profile.profilePageData);
  const avatars = useSelector((state) => state.profile.avatars);
  const userAvatarsId = useSelector((state) => state.profile.userAvatarsId);
  const error = useSelector((state) => state.profile.error);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurmame] = useState("");
  const [password, setPassword] = useState("");
  const [avatarsList, setAvatarsList] = useState([]);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (!profilePageData) {
      dispatch(getProfile());
    }
    setName(profilePageData?.name);
    setSurmame(profilePageData?.surname);
    setAvatarsList(avatars);
    if (!error) {
      setPassword("");
    }
  }, [dispatch, profilePageData]);

  const submitHandle = (e) => {
    e.preventDefault();
    const data = {
      name,
      surname,
      password,
    };
    dispatch(editProfile(data));
  };

  const handleBuyAvatar = () => {
    if (avatar) {
      if (userAvatarsId.indexOf(avatar.id) !== -1) {
        dispatch(
          showModal({
            message: "У вас уже есть такой аватар",
          })
        );
        return;
      }
      if (profilePageData.points > avatars[avatar.id].cost) {
        dispatch(buyAvatar(avatar.id));
      } else {
        dispatch(
          showModal({
            message:
              "К сожалению вам не хватает очков. Но вы можете заработать их пройдя тесты  или уроки.",
          })
        );
      }
    } else {
      dispatch(
        showModal({
          message:
            "Извините, не выбран аватар. Для выбора аватара нажмите на него.",
        })
      );
    }
  };

  return (
    <div className="container-fluid text-center pb-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mb-5">Здравствуйте, {profilePageData?.name}</h2>
          <div className="profile-container">
            <div className="left-column">
              <div className="profile-image-container">
                <img
                  src={avatar?.src ?? profilePageData?.image_url}
                  alt="..."
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div>
                <AvatarsSlider
                  images={avatarsList}
                  avatar={avatar}
                  setAvatar={setAvatar}
                  userAvatarsId={userAvatarsId}
                  handleBuyAvatar={handleBuyAvatar}
                />
              </div>
            </div>
            <div className="profile-form">
              <h3 className="mb-3">
                Ваш баланс: {profilePageData?.points}{" "}
                <i className="fa fa-bolt text-primary ml-1"></i>
              </h3>
              <Form onSubmit={submitHandle}>
                <Form.Group controlId="text">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Введите имя"
                  />
                </Form.Group>
                <Form.Group controlId="text">
                  <Form.Label>Фамилия</Form.Label>
                  <Form.Control
                    onChange={(e) => setSurmame(e.target.value)}
                    value={surname}
                    type="text"
                    placeholder="Введите фамилию"
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Подтвердите пароль</Form.Label>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Подтвердите пароль"
                  />
                  {error && (
                    <span
                      className="mt-2"
                      style={{ display: "block", color: "red" }}
                    >
                      {error[0]}
                    </span>
                  )}
                </Form.Group>
                <Button className="w-100" variant="primary" type="submit">
                  Сохранить
                </Button>
                <hr />
              </Form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
