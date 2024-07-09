import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Succes.module.css";
import { useDispatch } from "react-redux";
import { typeAppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

export function Success() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeAppDispatch>();

    const toMain = () => {
        dispatch(cartActions.clean());
        navigate("/");
    };

    return (
        <div className={styles.wrapper}>
            <img src="/pizza.png" alt="pizza" />
            <p className={styles.text}>Ваш заказ успешно оформлен!</p>
            <Button appearance="big" onClick={toMain}>
                Сделать новый
            </Button>
        </div>
    );
}
