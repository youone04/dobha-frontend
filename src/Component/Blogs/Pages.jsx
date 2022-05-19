import { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Pages = ({ itemsCount, itemsPerPage, currentPage, setCurrentPage }) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const changePage = (number) => {
    if (currentPage === number) return;
    setCurrentPage(number);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage((currentPage) => currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage((currentPage) => currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  };

  let isPageNumberOutOfRange;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2;

    if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item key={pageNumber} onClick={() => onPageNumberClick(pageNumber)} active={pageNumber === currentPage}>
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <>
      <Pagination className="mb-0">
        <Pagination.Prev onClick={onPreviousPageClick} disabled={isCurrentPageFirst} />
        {pageNumbers}
        <Pagination.Next onClick={onNextPageClick} disabled={isCurrentPageLast} />
      </Pagination>
    </>
  );
};

Pages.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pages;
