import App from './App.jsx'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import RegistrationForm from './RegistrationForm.jsx';
import Participants from './Participants.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup/1",
    element: <RegistrationForm />
  },
  {
    path: "/view/1",
    element: <Participants />
  },
  {
    path: "/signup/:id",
    element: <RegistrationForm />
  },
  {
    path: "/view/:id",
    element: <Participants />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
