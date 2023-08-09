import React, { useEffect, useState } from "react";
import RowTable from "./RowTableItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  fetchDataItem,
  findOneItem,
  putItem,
} from "../store/actions/itemActions";
import Swal from "sweetalert2";
import { fetchDataCategory } from "../store/actions/categoryActions";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.itemReducer);
  const { categories } = useSelector((state) => state.categoryReducer);
  const { inputItem } = useSelector((state) => state.itemReducer);
  let [loading, setLoading] = useState(true);

  let [input, setInput] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
    isRecommended: "",
    ingredients1: "",
    ingredients2: "",
    ingredients3: "",
    ingredients4: "",
    ingredients5: "",
  });
  useEffect(() => {
    //fetch data
    dispatch(fetchDataCategory());
    dispatch(fetchDataItem()).finally(() => {
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (inputItem) {
      setInput({
        id: inputItem.id,
        name: inputItem.name,
        description: inputItem.description,
        price: inputItem.price,
        imgUrl: inputItem.imgUrl,
        categoryId: inputItem.categoryId,
        isRecommended: inputItem.isRecommended,
      });
    }
  }, [inputItem]);

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmitEdit = (id) => {
    let formattedInput = {
      ...input,
      isRecommended: input.isRecommended === "true" ? true : false,
    };
    Swal.fire({
      html: 'Please wait...',
      timer: 0,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    dispatch(putItem(formattedInput, id))
      .then((data) => {
        dispatch(fetchDataItem());
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        return error;
      })
      .then((data) => {
        if (data) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${data.message}`,
            confirmButtonText: "Try again",
          });
        }
      });
    setInput({
      id: "",
      name: "",
      description: "",
      price: "",
      imgUrl: "",
      categoryId: "",
      isRecommended: "",
    });
  };
  const handleCancelEdit = () => {
    setInput({
      id: "",
      name: "",
      description: "",
      price: "",
      imgUrl: "",
      categoryId: "",
      isRecommended: "",
      ingredients1: "",
      ingredients2: "",
      ingredients3: "",
      ingredients4: "",
      ingredients5: "",
    });
  };
  const handleToEdit = (id) => {
    dispatch(findOneItem(id));
  };

  const handleSubmit = () => {
    Swal.fire({
      html: 'Please wait...',
      timer: 0,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    dispatch(addItem(input))
      .then((data) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Success add ${data.name}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        return error;
      })
      .then((data) => {
        if (data) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${data.message}`,
            confirmButtonText: "Try again",
          });
        }
      });

    setInput({
      name: "",
      description: "",
      price: "",
      imgUrl: "",
      authorId: "",
      categoryId: "",
      isRecommended: "",
      ingredients1: "",
      ingredients2: "",
      ingredients3: "",
      ingredients4: "",
      ingredients5: "",
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="col-start-2 col-span-4 m-16">
        <div className="flex flex-row justify-between w-full">
          <span>ITEM LIST</span>
          <label
            htmlFor="my-modal"
            className="btn modal-button mb-5">
            Create Item
          </label>
        </div>
        {loading === false ? (
        <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>NO</th>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>INGREDIENTS</th>
            <th>PRICE</th>
            <th>IMAGE</th>
            <th>CATEGORY</th>
            <th>RECOMMENDED</th>
            <th>CREATED BY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {
            //looping data
            items.map((data, idx) => {
              return (
                <RowTable
                  dispatch={dispatch}
                  handleToEdit={handleToEdit}
                  item={data}
                  idx={idx}
                  key={data.id}
                />
              );
            })
          }
        </tbody>
      </table>
        ) : (
          <progress className="progress w-100"></progress>
        )

        }


        {/* MODAL FOR ADD ITEM */}
        <input
          type="checkbox"
          id="my-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create New Item</h3>
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Name<span style={{ color: "red" }}>*</span>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text">
                    Description<span style={{ color: "red" }}>*</span>
                  </span>
                </label>
                <textarea
                  type="text"
                  className="input input-bordered"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text">
                    Price<span style={{ color: "red" }}>*min 4000</span>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="price"
                  value={input.price}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text">
                    Image Url<span style={{ color: "red" }}>*</span>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="imgUrl"
                  value={input.imgUrl}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text">
                    Ingredient 1<span style={{ color: "red" }}>*</span>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="ingredients1"
                  value={input.ingredients1}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text">Ingredient 2</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="ingredients2"
                  value={input.ingredients2}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text">Ingredient 3</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="ingredients3"
                  value={input.ingredients3}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text">Ingredient 4</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="ingredients4"
                  value={input.ingredients4}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text">Ingredient 5</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="ingredients5"
                  value={input.ingredients5}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text">
                    Category<span style={{ color: "red" }}>*</span>
                  </span>
                </label>
                <select
                  className="input input-bordered"
                  name="categoryId"
                  value={input.categoryId}
                  onChange={handleChange}
                  required>
                  <option
                    disabled
                    value="">
                    ==Please Select Category==
                  </option>
                  {categories.map((el) => {
                    return (
                      <option
                        value={el.id}
                        key={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-control mt-6 flex flex-row-reverse">
                <label
                  onClick={() => {
                    handleCancelEdit();
                  }}
                  htmlFor="my-modal"
                  className="btn btn-error btn-sm mx-6">
                  Cancel
                </label>
                <label
                  onClick={() => {
                    handleSubmit();
                  }}
                  type="submit"
                  htmlFor="my-modal"
                  className="btn btn-sm btn-info">
                  Submit
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* MODAL FOR EDIT ITEM */}
        <input
          type="checkbox"
          id="edit"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Item</h3>
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text text-xl">Description</span>
                </label>
                <textarea
                  type="text"
                  className="input input-bordered"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text text-xl">Price</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="price"
                  value={input.price}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text text-xl">Image Url</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="imgUrl"
                  value={input.imgUrl}
                  onChange={handleChange}
                  required
                />

                <label className="label">
                  <span className="label-text text-xl">Category</span>
                </label>
                <select
                  className="input input-bordered"
                  name="categoryId"
                  value={input.categoryId}
                  onChange={handleChange}
                  required>
                  {categories.map((el) => {
                    return (
                      <option
                        key={el.id}
                        value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </select>

                <label className="label">
                  <span className="label-text text-xl">
                    Recommended or not Recommended?
                  </span>
                </label>
                <select
                  className="input input-bordered"
                  name="isRecommended"
                  value={input.isRecommended}
                  onChange={handleChange}
                  required>
                  <option value={true}>Recommended</option>
                  <option value={false}>Not Recommend</option>
                </select>
              </div>
              <div className="form-control mt-6 flex flex-row-reverse">
                <label
                  onClick={() => {
                    handleCancelEdit();
                  }}
                  htmlFor="edit"
                  className="btn btn-error btn-sm mx-6">
                  Cancel
                </label>
                <label
                  onClick={() => {
                    handleSubmitEdit(input.id);
                  }}
                  type="submit"
                  htmlFor="edit"
                  className="btn btn-sm btn-info">
                  Submit
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
