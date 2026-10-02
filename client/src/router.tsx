import { createBrowserRouter } from "react-router";
import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import Login, { loginAction } from "@/pages/Login";
import Register, { registerAction } from "@/pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: Home }],
  },
  {
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login, action: loginAction},
      { path: "register", Component: Register, action: registerAction },
    ],
  },
]);

export default router;
