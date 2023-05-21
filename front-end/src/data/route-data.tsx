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
        path: "/skills",
        element: <Skills/>,
    },
    {
        path: "/achievements",
        element: <Achievements/>,
    },
    {
        path: "/projects",
        element: <Projects/>,
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
    "/":"#ff9a2c",
    "/skills":"#ffe238",
    "/achievements":"#e79342",
    "/projects": "#ffd540",
    "/more": "#da9627",
}

export enum LocationNames {
    home = "/",
    projects = "/projects",
    skills = "/skills",
    achievements = "/achievements",
    more = "/more",
    menu = "/menu"
}