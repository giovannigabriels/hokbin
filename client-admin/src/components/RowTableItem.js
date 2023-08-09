import React, { useEffect } from "react";
import { deleteItem, fetchDataItem } from "../store/actions/itemActions";
import Swal from "sweetalert2";

export default function RowTable({ item, idx, handleToEdit, dispatch }) {
  const handleDelete = async (id) => {
    Swal.fire({
      title: `Are you sure you want to delete ${item.name}?`,
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
        dispatch(deleteItem(id))
        .then(() => {
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Delete ${item.name} Success!`,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(fetchDataItem());
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
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>
        {item.Ingredients.map((el) => {
          return <li key={el.id}>{el.name}</li>;
        })}
      </td>
      <td>IDR {item.price}</td>
      <td>
        <img src={item.imgUrl} />
      </td>
      <td>{item.Category.name}</td>
      <td>{item.isRecommended ? <span>&#10004;</span> : ""}</td>
      <td>{item.User.username}</td>
      <td>
        <label
          onClick={() => handleToEdit(item.id)}
          htmlFor="edit"
          className="btn modal-button mb-5">
          Edit
        </label>
        {/* <button className="btn btn-info">Edit</button> */}
        <button
          className="btn btn-error mx-5"
          onClick={() => handleDelete(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
