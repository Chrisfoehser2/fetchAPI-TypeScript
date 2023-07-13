import { Data_Per_Page, Max_Page } from "../data/data";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface PagePaginationProps {
  onPageChange: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  total: number;
}

export default function PagePagination(props: PagePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPageIndex, setStartPageIndex] = useState(1);
  const [endPageIndex, setEndPageIndex] = useState(Max_Page);

  const endIndex = Math.min(Max_Page, Math.ceil(props.total / Data_Per_Page));

  useEffect(() => {
    setEndPageIndex(endIndex);
  }, [props.total]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      if (currentPage === startPageIndex) {
        setStartPageIndex(currentPage - Max_Page);
        setEndPageIndex(currentPage - 1);
      }
      props.prevPage();
      setCurrentPage((curr) => curr - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(props.total / Data_Per_Page)) {
      if (currentPage === endPageIndex) {
        setStartPageIndex(currentPage + 1);
        setEndPageIndex(
          Math.min(
            currentPage + Max_Page,
            Math.ceil(props.total / Data_Per_Page)
          )
        );
      }
      props.nextPage();
      setCurrentPage(currentPage + 1);
    }
  };

  // @ts-expect-error -- TODO: Parameter 'e' implicitly has an 'any' type.
  const handlePageClick = (e) => {
    props.onPageChange(e.target.text);
    setCurrentPage(parseInt(e.target.text));
  };

  const RenderItem = () => {
    const item: React.JSX.Element[] = [];
    for (let page = startPageIndex; page <= endPageIndex; page++) {
      item.push(
        <PageItem
          key={page}
          onClick={(e) => handlePageClick(e)}
          value={page}
          active={page === currentPage}
          activeLabel=""
        >
          {page}
        </PageItem>
      );
    }
    return item;
  };

  return (
    <Pagination>
      <Pagination.Prev onClick={handlePrevPage} />
      {RenderItem()}

      <Pagination.Next onClick={handleNextPage} />
    </Pagination>
  );
}
