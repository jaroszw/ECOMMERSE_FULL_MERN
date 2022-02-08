import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

const LoadMore = () => {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;

  console.log(result);

  return (
    <div className="load_more">
      {result < page * 6 ? (
        " "
      ) : (
        <button onClick={() => setPage(page + 1)}> Load More</button>
      )}
    </div>
  );
};

export default LoadMore;
