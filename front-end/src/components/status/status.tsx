import { createContext, useEffect, useState } from "react"
import styles from "./status.module.css"
import { findNext } from "../Routing/router";

export const pagePadding = createContext({x:"2ch", y:"4ch"})
export default function Status(props:any) {

    let location = props.location;
    const [bottomText, setBottomText] = useState("next");
    const [topText, setTopText] = useState("scroll down for next page")
    const [showLocation, setShowLocation] = useState(true);

    const getCurrentPagePath = () => {
        return location=="/"?"home":location.replaceAll("/","");
    }

    useEffect(()=>{
        if(location == "/menu") {
            setBottomText("");
            setShowLocation(false);
            setTopText("click on box to open page")
        } else {
            setShowLocation(true);
        }
    },[location])



  return (
    <div>
        <div className={styles.statusOverlay}>
            <span
                style={{
                    position: "absolute",
                    top: "2ch",
                    left: "2ch",
                    lineHeight: 1,
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
            <span
                style={{
                    position: "absolute",
                    bottom: "2ch",
                    right: "2ch",
                    lineHeight: 1
                }}
                onClick={()=>{
                    console.log("Changing page")
                    const nextPage = findNext(location);
                    console.log(nextPage);
                    props.setLocation(nextPage.path);
                }}
            >{bottomText}</span>
        </div>
        <pagePadding.Provider value={{x:"2ch", y:"4ch"}} >
            {props.children}
        </pagePadding.Provider>
    </div>
  )
}
