import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchArticle } from "../store/slices/articleSlice";
import WordsComponent from "../components/WordsComponent/WordsComponent";
import Loader from "../components/Loader";

function SingleArticlePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.article.loading);
  const article = useSelector((state) => state.article.article);
  const words = useSelector((state) => state.article.words);
  const goBack = () => navigate(-1);
  const html = { __html: article?.text };

  useEffect(() => {
    dispatch(fetchArticle(id));
  }, [dispatch, id]);

  return (
    <div className="container-fluid text-center py-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="image-banner">
            <img src={article?.big_image_url} alt="banner" />
          </div>
          <h2 className="mb-5">{article?.heading}</h2>
          <div dangerouslySetInnerHTML={html}></div>
          <WordsComponent words={words} />
          <button onClick={goBack} className="btn btn-primary px-4">
            Список статей
          </button>
        </>
      )}
    </div>
  );
}

export default SingleArticlePage;
