import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import App from "../App";
import AutoLayouts from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <AutoLayouts><RegisterPage /></AutoLayouts>,
      },
      {
        path: "email",
        element: <AutoLayouts><CheckEmailPage /></AutoLayouts>,
      },
      {
        path: "password",
        element: <AutoLayouts><CheckPasswordPage /></AutoLayouts>,
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);
export default router;
