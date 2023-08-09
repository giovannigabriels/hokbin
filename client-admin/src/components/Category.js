import React, { useEffect, useState } from "react";
import RowTable from "./RowTableCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  fetchDataCategory,
  findOneCategory,
  putCategory,
} from "../store/actions/categoryActions";
import Swal from "sweetalert2";

export default function Category() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);
  const { inputCategory } = useSelector((state) => state.categoryReducer);
  let [input, setInput] = useState({
    id: "",
    name: "",
  });
  const handleEdit = (id) => {
    dispatch(findOneCategory(id));
  };
  useEffect(() => {
    //fetch data
    dispatch(fetchDataCategory());
  }, []);
  useEffect(() => {
    //fetch data
    if (inputCategory) {
      setInput({
        id: inputCategory.id,
        name: inputCategory.name,
      });
    }
  }, [inputCategory]);
  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });
  };

  const fetchData = () => {
    dispatch(fetchDataCategory());
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
    dispatch(addCategory(input))
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
      id: "",
      name: "",
    });
  };
  const handleSubmitEdit = (id) => {
    Swal.fire({
      html: 'Please wait...',
      timer: 0,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    dispatch(putCategory(input, id))
      .then((data) => {
        dispatch(fetchDataCategory());
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
    });
  };
  const handleCancelSubmit = () => {
    setInput({
      name: "",
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="col-start-2 col-span-4 m-16">
        <div className="flex flex-row justify-between">
          <span>CATEGORY LIST</span>
          <label
            htmlFor="category"
            className="btn modal-button mb-5">
            Create Category
          </label>
        </div>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>NO</th>
              <th>NAME</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              //looping data
              categories.map((data, idx) => {
                return (
                  <RowTable
                    handleEdit={handleEdit}
                    dispatch={dispatch}
                    fetchData={fetchData}
                    category={data}
                    idx={idx}
                    key={data.id}
                  />
                );
              })
            }
          </tbody>
        </table>
      </div>

      {/* MODAL FOR ADD CATEGORY */}
      <input
        type="checkbox"
        id="category"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create New Category</h3>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-6 flex flex-row-reverse">
              <label
                onClick={() => {
                  handleCancelSubmit();
                }}
                htmlFor="category"
                className="btn btn-error btn-sm mx-6">
                Cancel
              </label>
              <label
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
                htmlFor="category"
                className="btn btn-sm btn-info">
                Submit
              </label>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL FOR EDIT CATEGORY */}
      <input
        type="checkbox"
        id="editcategory"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Category</h3>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-6 flex flex-row-reverse">
              <label
                onClick={() => {
                  handleCancelSubmit();
                }}
                htmlFor="editcategory"
                className="btn btn-error btn-sm mx-6">
                Cancel
              </label>
              <label
                onClick={() => {
                  handleSubmitEdit(input.id);
                }}
                type="submit"
                htmlFor="editcategory"
                className="btn btn-sm btn-info">
                Submit
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
