import Menu from "./components/menu/menu";
import Status from "./components/status/status";
import Router from "./components/Routing/router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Background from "./components/background/background";
import { backgroundColours } from "./assets/route-data";

function App() {

  const [location, setLocation] = useState("/");
  const [backgroundColour, setBackgroundColour] = useState<string>("");

  useEffect(()=>{
    setBackgroundColour(backgroundColours[location])
  },[location]);

  return (
    <AnimatePresence>
        <Status setLocation={setLocation}  location={location} >
          <AnimatePresence>
            <Router location={location}/>
          </AnimatePresence>
          {location=="/menu"?"":<Background background={backgroundColour} />}
          <Menu/>
        </Status>
    </AnimatePresence>
  )
}

export default App
