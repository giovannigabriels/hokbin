import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/userAction";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [input, setInput] = useState({
    email: "",
    password: "",
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
    dispatch(login(input))
      .then(() => {
        navigate("/");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Success!",
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
      })
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center">
          <img src="https://images.bisnis-cdn.com/posts/2017/07/15/767914/hacktiv8.jpg" />
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form
            className="card-body"
            onSubmit={handleSubmit}>
            <h1>Login Here!</h1>
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
              <label className="label"></label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-info">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
