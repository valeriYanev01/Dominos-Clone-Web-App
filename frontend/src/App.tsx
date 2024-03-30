import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "menu",
      element: <Menu />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
