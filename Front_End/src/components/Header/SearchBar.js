import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchItems } from "../../actions";
import { useHistory } from "react-router-dom";

const SearchBar = (props) => {
  const [queryWord, setqueryWord] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(searchItems(queryWord))
    setqueryWord("");
  };

  return (
    <div>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleOnSubmit}>
        <input
          style={{ width: "290px" }}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setqueryWord(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
