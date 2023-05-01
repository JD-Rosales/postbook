import React from "react";
import { createBrowserRouter } from "react-router-dom";

const BaseLayout = React.lazy(() => import("../layout/BaseLayout"));
const Sidebar = React.lazy(() => import("../layout/Sidebar"));
const ErrorPage = React.lazy(() => import("@pages/Error"));
const Signup = React.lazy(() => import("@pages/Signup"));
const Login = React.lazy(() => import("@pages/Login"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Sidebar />
        <BaseLayout />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "child",
        element: <div>child route</div>,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);
