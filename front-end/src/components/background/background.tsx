import styles from "./background.module.css";
import { motion } from "framer-motion";

interface Props {
    background : string;
}

export default function Background(props : Props) {

    return (
    <motion.div
        className={styles.background}
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1,
            background: props.background,
        }}
        exit={{ opacity: 1 }}
    >
        {" "}
    </motion.div>
    )
}