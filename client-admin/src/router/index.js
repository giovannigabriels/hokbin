import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../components/Login";
import Category from "../components/Category";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import Register from "../components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) return redirect("/login");
    },
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
