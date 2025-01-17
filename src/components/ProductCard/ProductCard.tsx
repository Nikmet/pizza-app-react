import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { typeAppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { MouseEvent } from "react";
import { ProductCardProps } from "../CartItem/CartItem.props";

function ProductCard(props: ProductCardProps) {
    const dispatch = useDispatch<typeAppDispatch>();

    const add = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(cartActions.add(props.id));
    };

    return (
        <Link to={`/product/${props.id}`} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.head} style={{ backgroundImage: `url(${props.image})` }}>
                    <div className={styles.price}>
                        {props.price} <span>₽</span>
                    </div>
                    <button className={styles["add-to-cart"]} onClick={add}>
                        <img src="/pizza-app-react/cart-white.svg" alt="Добавить в корзину" />
                    </button>
                    <div className={styles.rating}>
                        {props.rating}
                        <img src="/pizza-app-react/star.svg" alt="звездочка" />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.title}>{props.name}</div>
                    <div className={styles.desc}>{props.description}</div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
