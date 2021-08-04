import React, { useEffect } from "react";
import "./MenuHeader.css";
import { getAllCategories } from "../../actions";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MenuHeader = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const renderCategoriies = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={category.name}
            >
              {category.name}
            </Link>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategoriies(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0
          ? renderCategoriies(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;
