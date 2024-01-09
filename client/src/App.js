import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './App.css';
import Home from  "./page/Home/Home";
import Profile from "./page/Profile/Profile";
import Explore from "./page/Explore/Explore";
import Signin from "./page/Signin/Signin";
import Register from "./page/Register/Register.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Error from "./page/Error/Error.jsx";
const Layout = ()=> {
  return (
    <div className="md:w-10/12 mx-auto">
      <Navbar />
      <Outlet></Outlet>
    </div>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/explore/",
        element: <Explore />
      },
      {
        path: "/signin/",
        element: <Signin />
      },
      {
        path: "/signup/",
        element: <Register />
      },
    ],
  
  },
])
function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;