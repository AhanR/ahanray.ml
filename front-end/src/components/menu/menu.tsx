import { LocationNames } from "../../data/route-data"
import ButtonLink from "../buttonLink/buttonLink"
import styles from "./menu.module.css"
import education from "../../icons/educationIcon.svg"
import code from "../../icons/codeIcon.svg"
import moreIcon from "../../icons/moreIcon.svg"
import { pagePadding } from "../status/status"
import { useContext } from 'react'

export default function Menu() {
  const padding = useContext(pagePadding)
  return (
    <div
      className={styles.menuContainer}
      style={{
        padding: `${padding.y} ${padding.x}`,
      }}
    >
      <ButtonLink
        to={LocationNames.skills}
        className={styles.skills}  
      >
        Can<br/>Ahan?
      </ButtonLink>
      <ButtonLink
        to={LocationNames.more}
        className={styles.more}  
      >
        <img src={moreIcon} alt={LocationNames.more} />
      </ButtonLink>
      <ButtonLink
        to={LocationNames.home}
        className={styles.home}  
      >
        Hi
      </ButtonLink>
      <ButtonLink
        to={LocationNames.projects}
        className={styles.projects}  
      >
        <img src={code} alt={LocationNames.projects} />
      </ButtonLink>
      <ButtonLink
        to={LocationNames.achievements}
        className={styles.achievements}  
      >
        {/* <img src={education} alt={LocationNames.achievements} /> */}
        Achie-<br/>
        vements
      </ButtonLink>
    </div>
  )
}
