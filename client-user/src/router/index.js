import { createBrowserRouter } from "react-router-dom";
import DetailPage from "../components/DetailPage";
import Home from "../components/Home";
import Login from "../components/Login";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import Register from "../components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
