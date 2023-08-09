import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/login");
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Logout Success!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <div className="navbar bg-orange-500">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to={"/"}>Dashboard</Link>
              </li>
              <li>
                <Link to={"/categories"}>Categories</Link>
              </li>
              <li>
                <Link to={"/register"}>Register Admin</Link>
              </li>
              <li>
                <a onClick={() => handleSignOut()}>Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img
            src="https://pbs.twimg.com/profile_images/1303645505465974785/BAedfmOT_400x400.jpg"
            style={{
              width: "75px",
              height: "75px",
            }}
          />
          <a className="btn btn-ghost normal-case text-xl"></a>
        </div>
        <div className="navbar-end">
          {/* <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="https://media-exp1.licdn.com/dms/image/C4E0BAQF8H0ymLxDgeA/company-logo_200_200/0/1601967650318?e=2147483647&v=beta&t=j0ITPEkEzZA4PDiuMt6FftmCVzV-IlP-aajx7E9aG4E"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button> */}
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
