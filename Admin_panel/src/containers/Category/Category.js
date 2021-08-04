import React, { useEffect, useState } from "react";
import Side_bar from "../Side_bar/Side_bar";
import { useDispatch, useSelector } from "react-redux";
import {
  getIntialData,
  addCategory,
  updateCategories,
  deleteCategories,
} from "../../actions";
import Input from "../../components/Reusable-components/Inputfield";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Modal } from "react-bootstrap";

import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircle,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";

const Category = () => {
  const [catagoryName, setcatagoryName] = useState("");
  const [parentCategoryId, setparentCategoryId] = useState("");
  const [categoryImg, setcategoryImg] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setcheckedArray] = useState([]);
  const [expandedArray, setexpandedArray] = useState([]);
  const [updateCategoryModal, setupdateCategoryModal] = useState(false);
  const [deleteCategoryModel, setdeleteCategoryModel] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const renderCategoriies = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategoriies(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setcategoryImg(e.target.files[0]);
  };

  const handleSubmitData = (e) => {
    const form = new FormData();
    form.append("name", catagoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImg);
    dispatch(addCategory(form)).then((result) => {
      if (result) {
        dispatch(getIntialData());
        setdeleteCategoryModel(false);
      }
    });
  };
  const updateCategoriesform = () => {
    setupdateCategoryModal(false);
    const form = new FormData();
    expandedArray.forEach((item, _index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, _index) => {
      console.log(checkedArray);
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
    setdeleteCategoryModel(false);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setcheckedArray(checkedArray);
    setexpandedArray(expandedArray);
  };
  const updateCategory = (e) => {
    updateCheckedAndExpandedCategories();

    setupdateCategoryModal(true);
  };
  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setcheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedexpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setexpandedArray(updatedexpandedArray);
    }
  };

  const DeleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setdeleteCategoryModel(true);
  };
  const deleteCategoryOnYesClick = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    if (checkedArray.length > 0) {
      dispatch(deleteCategories(checkedIdsArray));
      setdeleteCategoryModel(false);
    }
  };
  const renderDeleteCategoryModel = () => {
    return (
      <Modal
        show={deleteCategoryModel}
        onHide={() => setdeleteCategoryModel(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>confirm</Modal.Title>
        </Modal.Header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-10">
              <h5>Expanded</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              {expandedArray.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <h5>Checked</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              {checkedArray.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-10"></div>
            <div className="col-1">
              <button
                className="btn btn-danger"
                onClick={deleteCategoryOnYesClick}
              >
                Yes
              </button>
            </div>
            <div className="col-1">
              <button className="btn btn-info">No</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row  ">
        <div className="col-2 mx-0 px-0 ">
          <Side_bar />
        </div>
        <div className="col-10 ">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-md-12 "
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h1>Category</h1>
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Add Category
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 ">
                {/* <ul>{renderCategoriies(category.categories)}</ul> */}
                <CheckboxTree
                  nodes={renderCategoriies(category.categories)}
                  checked={checked}
                  expanded={expanded}
                  onCheck={(checked) => setChecked(checked)}
                  onExpand={(expanded) => setExpanded(expanded)}
                  icons={{
                    check: <IoCheckmarkCircle />,
                    uncheck: <IoCheckmarkCircleOutline />,
                    halfCheck: <IoCheckmarkCircleOutline />,
                    expandClose: <IoChevronForward />,
                    expandOpen: <IoChevronDown />,
                  }}
                />
              </div>
            </div>
            <div className="row pt-5">
              <div className="col-10"></div>
              <div className="col-1">
                <button onClick={updateCategory} className="btn btn-info">
                  Update
                </button>
              </div>
              <div className="col-1">
                <button onClick={DeleteCategory} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add New Category
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Input
                    value={catagoryName}
                    placeholder={"Category Name"}
                    onChange={(e) => setcatagoryName(e.target.value)}
                  />
                  <select
                    className="form-control"
                    onChange={(e) => setparentCategoryId(e.target.value)}
                    value={parentCategoryId}
                  >
                    <option>Select Category</option>
                    {createCategoryList(category.categories).map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="file"
                    name="categoryImg"
                    onChange={handleCategoryImage}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    data-dismiss="modal"
                    onClick={() => {
                      handleSubmitData();
                      // refreshPage();
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
            {renderDeleteCategoryModel()}
            {/* *.................Edit Category Model...........................* */}

            <Modal
              show={updateCategoryModal}
              onHide={() => setupdateCategoryModal(false)}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Update Categories</Modal.Title>
              </Modal.Header>
              <div className="conatiner-fluid px-5">
                <div className="row">
                  <div className="col-12">Expanded</div>
                </div>
                {expandedArray.length > 0 &&
                  expandedArray.map((item, index) => {
                    return (
                      <div className="row" key={index}>
                        <div className="col-4">
                          <Input
                            value={item.name}
                            placeholder={"Category Name"}
                            onChange={(e) =>
                              handleCategoryInput(
                                "name",
                                e.target.value,
                                index,
                                "expanded"
                              )
                            }
                          />
                        </div>
                        <div className="col-4 pt-4">
                          <select
                            className="form-control"
                            onChange={(e) =>
                              handleCategoryInput(
                                "parentId",
                                e.target.value,
                                index,
                                "expanded"
                              )
                            }
                            value={item.parentId}
                          >
                            <option>Select Category</option>
                            {createCategoryList(category.categories).map(
                              (option) => (
                                <option value={option.value} key={option.value}>
                                  {option.name}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="col-4 pt-4">
                          <select
                            className="form-control"
                            value={item.type}
                            onChange={(e) =>
                              handleCategoryInput(
                                "type",
                                e.target.value,
                                index,
                                "expanded"
                              )
                            }
                          >
                            <option value="">Select Type</option>
                            <option value="store">Store</option>
                            <option value="product">Product</option>
                            <option value="page">Page</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                <h6 className="pt-2">Checked Categories</h6>
                {checkedArray.length > 0 &&
                  checkedArray.map((item, index) => {
                    return (
                      <div className="row" key={index}>
                        <div className="col-4">
                          <Input
                            value={item.name}
                            placeholder={"Category Name"}
                            onChange={(e) =>
                              handleCategoryInput(
                                "name",
                                e.target.value,
                                index,
                                "checked"
                              )
                            }
                          />
                        </div>
                        <div className="col-4 pt-4">
                          <select
                            className="form-control"
                            onChange={(e) =>
                              handleCategoryInput(
                                "parentId",
                                e.target.value,
                                index,
                                "checked"
                              )
                            }
                            value={item.parentId}
                          >
                            <option>Select Category</option>
                            {createCategoryList(category.categories).map(
                              (option) => (
                                <option value={option.value} key={option.value}>
                                  {option.name}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="col-4 pt-4">
                          <select
                            className="form-control"
                            value={item.type}
                            onChange={(e) =>
                              handleCategoryInput(
                                "type",
                                e.target.value,
                                index,
                                "checked"
                              )
                            }
                          >
                            <option value="">Select Type</option>
                            <option value="store">Store</option>
                            <option value="product">Product</option>
                            <option value="page">Page</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}

                {/* <div className="row py-2">
                  <div className="col-12">
                    <input type="file" name="categoryImg" onChange={() => {}} />
                  </div>
                </div> */}
                <div className="row py-4">
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-info"
                      data-dismiss="modal"
                      onClick={updateCategoriesform}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
