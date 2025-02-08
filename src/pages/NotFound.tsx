import { useNavigate } from "react-router";
import Button from "../components/Button";
import styles from "../styles/modules/NotFound.module.scss";

const NotFound = () => {
   const navigate = useNavigate();

   return (
      <div className={styles.notFound}>
         <h1>404... PAGE NOT FOUND!</h1>
         <Button
            type="secondary"
            version="two"
            text="Go back"
            onClick={() => {
               navigate(-1);
            }}
         />
      </div>
   );
};

export default NotFound;
