import { createContext, useEffect, useState } from "react"
import styles from "./status.module.css"
import { findNext } from "../Routing/router";
import { useSelector, useDispatch } from  "react-redux"
import { LocationState, changeLocation } from "../../stores/locationSlices";
import { LocationNames } from "../../data/route-data";
import { replaceSlash } from "../../utils/replace";


const aspectRato = 1;
const pagePaddingValue = (window.innerHeight > aspectRato*window.innerWidth)? {x:"2ch", y:"4ch"} : {x: `${window.innerWidth/2 - 9*(window.innerHeight-40)/32}px`, y: "4ch"};
export const pagePadding = createContext(pagePaddingValue);

export default function Status(props:any) {


    const location = useSelector((state: LocationState)=>state.location);
    const dispatcher = useDispatch();

    const [bottomText, setBottomText] = useState("next");
    const [showBottomText, setShowBottomText] = useState(true);
    const [topText, setTopText] = useState("scroll down for next page")
    const [showLocation, setShowLocation] = useState(true);

    const getCurrentPagePath = () => {
        return location==LocationNames.home?"home":replaceSlash(location);
    }

    const extraStyle = { color: "white" }

    // set the button to menu when the next page is menu, set the button to menu after that and next link should project to menu
    useEffect(()=>{
        if(location == LocationNames.menu) {
            setShowBottomText(false);
            setShowLocation(false);
            setTopText("click on box to open page")
        } else {
            setShowLocation(true);
            // count the rounds since start and insert here
            if(topText == "click on box to open page") {
                setTopText("swipe to get to menu")
            }
            setShowBottomText(true);
            
            if(findNext(location).path == LocationNames.menu) {
                setTopText("fin.");
                setBottomText("menu");
            } else {
                setBottomText("next");
            }
        }

    },[location])



  return (
    <div>
        <div
            className={styles.statusOverlay}
            style={location==LocationNames.menu?extraStyle:{}}
        >
            <span
                onClick={()=>{
                    dispatcher(changeLocation(LocationNames.menu));
                }}
                style={{
                    position: "absolute",
                    top: "2ch",
                    left: "2ch",
                    lineHeight: 1,
                    pointerEvents: "all"
                }}
            >Ahan</span>
            <span
                style={{
                    position: "absolute",
                    top: "4ch",
                    right: "4ch",
                    fontSize: "0.5rem",
                    lineHeight: 1
                }}
            >{topText}</span>
            <span
                style={{
                    position: "absolute",
                    bottom: "4ch",
                    left: "4ch",
                    fontSize: "0.5rem",
                    lineHeight: 1
                }}
            >{showLocation?getCurrentPagePath():""}</span>
            {showBottomText?(<span
                style={{
                    position: "absolute",
                    bottom: "2ch",
                    right: "2ch",
                    lineHeight: 1,
                    pointerEvents: "all"
                }}
                onClick={()=>{
                    if(bottomText == "menu"){
                        dispatcher(changeLocation(LocationNames.menu));
                    } else {
                        const page = findNext(location);
                        dispatcher(changeLocation(page.path));
                    }
                }}
            >{bottomText}</span>):""}
        </div>
        <pagePadding.Provider value={pagePaddingValue} >
            {props.children}
        </pagePadding.Provider>
    </div>
  )
}
