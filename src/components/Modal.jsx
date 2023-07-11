import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { closeModal } from "../store/slices/modalSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ErrorModal() {
  const show = useSelector((state) => state.modal.show);
  const message = useSelector((state) => state.modal.message);
  const reason = useSelector((state) => state.modal.reason);
  const path = useSelector((state) => state.modal.path);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => dispatch(closeModal());
  const authRequireHandle = () => {
    navigate("auth/login", { state: { from: path } });
    dispatch(closeModal());
  };

  return (
    <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
      <Modal.Header closeButton>
        <Modal.Title>Уведомление</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        {reason === "authRequire" && (
          <Button variant="success" onClick={authRequireHandle}>
            Войти
          </Button>
        )}
        <Button variant="primary" onClick={handleClose}>
          Понятно
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
