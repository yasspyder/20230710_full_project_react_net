import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/slices/allArticlesSlice";
import CardComponent from "../components/CardComponent";
import Sceleton from "../components/Sceleton";

function ArticlesPage() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const loading = useSelector((state) => state.articles.loading);

  useEffect(() => {
    if (!articles.length) dispatch(fetchArticles());
  }, [articles, dispatch]);

  return (
    <div className="container-fluid text-center">
      <h2 className="mb-5">Статьи</h2>
      {loading ? (
        <Sceleton />
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <div className="row w-100">
              {articles.map(({ id, image_url, heading }) => {
                return (
                  <CardComponent
                    key={id}
                    img={image_url}
                    title={heading}
                    linkPath={`/articles/${id}`}
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

export default ArticlesPage;
