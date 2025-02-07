import styles from "../styles/modules/Backdrop.module.scss";

type BackdropType = {
   children?: React.ReactNode;
};

const Backdrop = ({ children }: BackdropType) => {
   return <div className={styles.backdrop}>{children}</div>;
};

export default Backdrop;
