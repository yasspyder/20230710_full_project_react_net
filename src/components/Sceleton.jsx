import ContentLoader from 'react-content-loader';

const Sceleton = (props) => {
  const loader = [1, 2, 3];

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row w-100">
          {loader.map((item) => (
            <div key={item} className="col col-xl-4 col-md-6 col-12 p-3 w-100">
              <ContentLoader
                speed={2}
                width={436}
                height={600}
                viewBox="0 0 436 600"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
              >
                <rect x="0" y="0" rx="0" ry="0" width="436" height="245" />
                <rect x="0" y="260" rx="0" ry="0" width="436" height="45" />
                <rect x="0" y="365" rx="0" ry="0" width="436" height="15" />
                <rect x="0" y="390" rx="0" ry="0" width="436" height="15" />
                <rect x="0" y="315" rx="0" ry="0" width="436" height="15" />
                <rect x="0" y="340" rx="0" ry="0" width="436" height="15" />
                <rect x="0" y="365" rx="0" ry="0" width="436" height="15" />
                <rect x="0" y="390" rx="0" ry="0" width="436" height="15" />
                <rect x="0" y="415" rx="0" ry="0" width="436" height="15" />
                <rect x="0" y="440" rx="0" ry="0" width="436" height="15" />
                <rect x="0" y="465" rx="0" ry="0" width="436" height="15" />
                <rect x="0" y="540" rx="0" ry="0" width="436" height="60" />
              </ContentLoader>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sceleton;
