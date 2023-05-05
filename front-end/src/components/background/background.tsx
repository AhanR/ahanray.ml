import styles from "./background.module.css";
import { motion } from "framer-motion";

interface Props {
    background : string;
}

export default function Background(props : Props) {

    return (
    <motion.div
        className={styles.background}
        style={{
            background: props.background,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
    >
        {" "}
    </motion.div>
    )
}