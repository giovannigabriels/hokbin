import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  deleteCategory,
  fetchDataCategory,
  findOneCategory,
} from "../store/actions/categoryActions";
import Swal from "sweetalert2";

export default function RowTable({ category, idx, dispatch, handleEdit }) {
  const handleDelete = (id) => {
    Swal.fire({
      title: `Are you sure you want to delete ${category.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          html: 'Please wait...',
          timer: 0,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        dispatch(deleteCategory(id))
        .then(() => {
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Delete Category ${category.name} Success!`,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(fetchDataCategory());
        })
        .catch((error) => {
          return error
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
        })
       
      }
    });
  };

  return (
    <tr>
      <th>{idx + 1}</th>
      <td>{category.name}</td>
      <td>
        <label
          onClick={() => handleEdit(category.id)}
          htmlFor="editcategory"
          className="btn modal-button mx-5">
          Edit
        </label>
        <button
          className="btn btn-error mx-5"
          onClick={() => handleDelete(category.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
