import ButtonLink from "../buttonLink/buttonLink"
import styles from "./menu.module.css"

export default function Menu() {
  return (
    <div
      className={styles.menuContainer}
    >
      <ButtonLink to="/">
        click me
      </ButtonLink>
    </div>
  )
}
