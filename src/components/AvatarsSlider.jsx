import AwesomeSlider from "react-awesome-slider";
import { Button } from "react-bootstrap";
import "react-awesome-slider/dist/styles.css";

function AvatarsSlider({ images, setAvatar, userAvatarsId, handleBuyAvatar }) {
  const handleAvatar = (e) => {
    const src = e.target.getAttribute("src");
    const id = e.target.getAttribute("id-data");
    setAvatar({ id, src });
  };

  return (
    <>
      <p>Магазин аватаров:</p>
      <AwesomeSlider bullets={true} organicArrows={false}>
        {images?.map((item) => (
          <div key={item.id} className="avatar-item">
            <img
              src={item.image_url}
              alt="avatar"
              onClick={handleAvatar}
              id-data={item.id}
            />
            {userAvatarsId.indexOf(item.id) === -1 ? (
              <span className="cost">
                {item.cost} <i className="fa fa-bolt text-primary ml-1"></i>
              </span>
            ) : (
              ""
            )}
          </div>
        ))}
      </AwesomeSlider>
      <Button
        className="w-100"
        style={{ marginTop: "50px" }}
        variant="primary"
        onClick={() => handleBuyAvatar()}
      >
        Купить
      </Button>
    </>
  );
}

export default AvatarsSlider;
