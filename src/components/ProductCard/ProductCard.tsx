import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";

function ProductCard(props: ProductCardProps) {
    return (
        <Link to={`/product/${props.id}`} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.head} style={{ backgroundImage: `url(${props.image})` }}>
                    <div className={styles.price}>
                        {props.price} <span>₽</span>
                    </div>
                    <button className={styles["add-to-cart"]}>
                        <img src="./cart-white.svg" alt="Добавить в корзину" />
                    </button>
                    <div className={styles.rating}>
                        {props.rating}
                        <img src="./star.svg" alt="звездочка" />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.title}>{props.title}</div>
                    <div className={styles.desc}>{props.description}</div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
