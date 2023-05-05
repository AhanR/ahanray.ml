import Achievements from "../pages/achievements";
import Home from "../pages/home";
import Projects from "../pages/projects";
import Skills from "../pages/skills";
import More from "../pages/more";

export const pages = [
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
        path : "/menu",
        element: <></>
    }
];

export interface JSONObject {
    [k: string]: string
  }

export const backgroundColours: JSONObject = {
    "/":"#fff",
    "/projects":"#aaa",
    "/skills":"#bbb",
    "/achievements": "#999",
    "/more": "#777",
}