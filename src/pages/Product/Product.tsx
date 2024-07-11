import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";
import { MouseEvent, Suspense } from "react";
import styles from "./Product.module.css";
import Headling from "../../components/Headling/Headling";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { typeAppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

export function Product() {
    const data = useLoaderData() as { data: IProduct };
    const navigate = useNavigate();
    const dispatch = useDispatch<typeAppDispatch>();

    const goBack = () => {
        navigate("/");
    };

    return (
        <>
            <Suspense fallback={"Загрузка..."}>
                <Await resolve={data.data}>
                    {({ data }: { data: IProduct }) => (
                        <div>
                            <div className={styles.header}>
                                <button className={styles.back} onClick={goBack}>
                                    <img src="/pizza-app-react/back.svg" alt="back" />
                                </button>
                                <Headling>{data.name}</Headling>
                                <Button
                                    className={styles.button}
                                    onClick={(e: MouseEvent) => {
                                        e.preventDefault();
                                        dispatch(cartActions.add(data.id));
                                    }}
                                >
                                    <img src="/pizza-app-react/cart-white.svg" alt="cart" />В
                                    корзину
                                </Button>
                            </div>
                            <div className={styles.body}>
                                <div
                                    className={styles.image}
                                    style={{ backgroundImage: `url(${data.image})` }}
                                ></div>
                                <div className={styles.desc}>
                                    <div className={styles.price}>
                                        <span>Цена</span>
                                        <span>{data.price} ₽</span>
                                    </div>
                                    <div className={styles["rating-wrapper"]}>
                                        <span>Рейтинг</span>
                                        <div className={styles.rating}>
                                            {data.rating}
                                            <img src="/pizza-app-react/star.svg" alt="звездочка" />
                                        </div>
                                    </div>
                                    <div className={styles.ingredients}>
                                        <span>Состав:</span>
                                        <ul>
                                            {data.ingredients.map((i) => (
                                                <li>{i}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Await>
            </Suspense>
        </>
    );
}
