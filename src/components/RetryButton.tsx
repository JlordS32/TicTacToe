import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/modules/RetryButton.module.scss";

type RetryButtonType = {
   onClick?: () => void;
};

const RetryButton = ({ onClick }: RetryButtonType) => {
   return (
      <button className={styles.retry} onClick={onClick}>
         <FontAwesomeIcon
            className={styles.icon}
            icon={faRotateRight}
            size="xl"
         />
      </button>
   );
};

export default RetryButton;
