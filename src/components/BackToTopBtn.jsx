import { useEffect, useState } from 'react';

function BackToTopBtn() {
  const [showBtn, setShowBtn] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.pageYOffset > 300 ? setShowBtn(true) : setShowBtn(false);
    };

    window.addEventListener('scroll', handleScrollButtonVisibility);

    return () => {
      window.removeEventListener('scroll', handleScrollButtonVisibility);
    };
  });

  return (
    <>
      {showBtn && (
        <div
          onClick={handleScrollToTop}
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
        >
          <i className="fa fa-angle-double-up"></i>
        </div>
      )}
    </>
  );
}

export default BackToTopBtn;
