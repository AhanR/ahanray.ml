import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Menu from "./components/menu/menu";
import Home from "./pages/home";
import Projects from "./pages/projects";
import Skills from "./pages/skills";
import Achievements from "./pages/achievements";
import More from "./pages/more";
import Stream from "./pages/stream";
import Status from "./components/status/status";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/projects",
      element: <Projects/>,
    },
    {
      path: "/skills",
      element: <Skills/>,
    },
    {
      path: "/achievements",
      element: <Achievements/>,
    },
    {
      path: "/more",
      element: <More/>,
    },
    {
      path: "/stream",
      element: <Stream/>,
    },
  ]);

  return (
    <>
        <Status>
          <RouterProvider router={router} />
          <Menu/>
        </Status>
    </>
  )
}

export default App
