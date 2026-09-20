import { createBrowserRouter } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: Home }],
  },
  {
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login, },
      { path: "register", Component: Register },
    ],
  },
]);

export default router;
