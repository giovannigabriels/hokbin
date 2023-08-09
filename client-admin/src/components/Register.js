import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { register } from "../store/actions/userAction";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    Address: "",
  });

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    Swal.fire({
      html: 'Please wait...',
      timer: 0,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    dispatch(register(input))
      .then(() => {
        navigate("/");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Register Admin Success!",
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
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form
          className="card-body"
          onSubmit={handleSubmit}>
          <h1>Register Here!</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered"
              value={input.username}
              onChange={handleChange}
              name="username"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              className="input input-bordered"
              value={input.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              value={input.password}
              onChange={handleChange}
              name="password"
              required
            />

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                className="input input-bordered"
                value={input.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered"
                value={input.Address}
                onChange={handleChange}
                name="Address"
                required
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-info">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
