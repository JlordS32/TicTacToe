import styles from "../styles/modules/Button.module.scss";
import "../styles/modules/Button.module.scss";
import { ButtonType } from "../types/ButtonType";

const Button = ({
   text = "Button",
   onClick = () => {},
   type = "primary",
   version = "one",
}: ButtonType) => {
   return (
      <button
         className={`${styles[type]} ${styles[version]}`}
         onClick={onClick}
      >
         <span>{text}</span>
      </button>
   );
};

export default Button;
