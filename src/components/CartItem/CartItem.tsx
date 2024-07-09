import { useDispatch } from "react-redux";
import { CartItemProps } from "../ProductCard/ProductCard.props";
import { typeAppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import styles from "./CartItem.module.css";
import cn from "classnames";

export function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<typeAppDispatch>();

    const add = () => {
        dispatch(cartActions.add(props.id));
    };
    const remove = () => {
        dispatch(cartActions.remove(props.id));
    };
    const deleteProduct = () => {
        dispatch(cartActions.delete(props.id));
    };

    return (
        <div className={styles.item}>
            <div className={styles.desc}>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${props.image})` }}
                ></div>
                <div className={styles.wrapper}>
                    <div className={styles.name}>{props.name}</div>
                    <div className={styles.price}>{props.price + "₽"}</div>
                </div>
            </div>
            <div className={styles.actions}>
                <button className={cn(styles.button, styles.minus)} onClick={remove}>
                    -
                </button>
                <div className={styles.counter}>{props.count}</div>
                <button className={cn(styles.button, styles.plus)} onClick={add}>
                    +
                </button>
                <button className={cn(styles.button, styles.delete)} onClick={deleteProduct}>
                    <img src="/delete.svg" alt="Удалить товар" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
