import { createContext } from "react"
import styles from "./status.module.css"

export const pagePadding = createContext({x:"2ch", y:"4ch"})
export default function Status(props:any) {

    const getCurrentPagePath = () => {
        const loc = window.location.pathname.replaceAll("/","");
        return loc==""?"home":loc;
    }

  return (
    <div>
        <div className={styles.statusOverlay}>
            <span
                style={{
                    position: "absolute",
                    top: "2ch",
                    left: "2ch"
                }}
            >Ahan</span>
            <span
                style={{
                    position: "absolute",
                    top: "4ch",
                    right: "4ch",
                    fontSize: "0.5rem"
                }}
            >Swipe right to begin</span>
            <span
                style={{
                    position: "absolute",
                    bottom: "4ch",
                    left: "4ch",
                    fontSize: "0.5rem"
                }}
            >{getCurrentPagePath()}</span>
            <span
                style={{
                    position: "absolute",
                    bottom: "2ch",
                    right: "2ch"
                }}
            >Next</span>
        </div>
        <pagePadding.Provider value={{x:"2ch", y:"4ch"}} >
            {props.children}
        </pagePadding.Provider>
    </div>
  )
}
