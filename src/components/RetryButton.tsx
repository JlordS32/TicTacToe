import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/modules/RetryButton.module.scss";

const RetryButton = () => {
   return (
      <button className={styles.retry}>
         <FontAwesomeIcon
            className={styles.icon}
            icon={faRotateRight}
            size="xl"
         />
      </button>
   );
};

export default RetryButton;
      