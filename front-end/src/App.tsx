import Menu from "./components/menu/menu";
import Status from "./components/status/status";
import Router from "./components/Routing/router";
import Background from "./components/background/background";
import { LocationNames, backgroundColours } from "./data/route-data";
import { LocationState, changeLocation } from "./stores/locationSlices";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

function App() {

  // getting the location from the global store and creating a new function to set the global location
  const location = useSelector((state: LocationState)=> state.location);
  const dispatcher = useDispatch();
  const setLocation = (loc:string)=>{
    dispatcher(changeLocation(loc));
  }

  // background colour maintained to change the background object
  const [backgroundColour, setBackgroundColour] = useState<string>("#ffffff");

  // changing background colours on location change
  useEffect(()=>{
    setBackgroundColour(backgroundColours[location])
  },[location]);

  return (
    <AnimatePresence initial={false} >
        <Status setLocation={setLocation}  location={location} >
          <AnimatePresence initial={false}>
            <Router/>
          </AnimatePresence>
          {location==LocationNames.menu?"":<Background background={backgroundColour} />}
          <Menu/>
        </Status>
    </AnimatePresence>
  )
}

export default App
