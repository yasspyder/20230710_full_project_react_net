import { Card } from 'react-bootstrap';
import { BsTrash, BsFillPencilFill, BsFillStarFill } from 'react-icons/bs';
import { toggleWordToRepeat } from '../store/slices/repeatWordsSlice';
import { useDispatch } from 'react-redux';

function WordCardComponent({
  addRepeatWord,
  value,
  translate,
  id,
  articleId,
  img,
  removeWordFromDictionary,
  editWord,
}) {
  const dispatch = useDispatch();

  const handlerRepeatWordsId = (e) => {
    const wordToRepeat = { id, value, translate, img };
    dispatch(toggleWordToRepeat(wordToRepeat));
    const svg = e.target.closest('svg');
    svg.classList.toggle('active');
    addRepeatWord(e.target);
  };
  const handlerRemoveWord = (e) => {
    removeWordFromDictionary(e.target);
  };

  const hadlerEditWord = (e) => {
    editWord(e.target);
  };

  return (
    <div className="col col-xl-4 col-md-6 col-12 p-3 w-100">
      <Card
        className="h-100"
        style={{ overflow: 'hidden', position: 'relative' }}
        data-word={id}
      >
        <div className="word__image-contaner">
          <Card.Img variant="top" src={img} alt={value} />
        </div>
        <div className="word__tools">
          <BsTrash onClick={handlerRemoveWord} />
          {!articleId && <BsFillPencilFill onClick={hadlerEditWord} />}
          <BsFillStarFill onClick={handlerRepeatWordsId} />
        </div>
        <Card.Body>
          <Card.Title>{value}</Card.Title>
          <Card.Text>{translate}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default WordCardComponent;
