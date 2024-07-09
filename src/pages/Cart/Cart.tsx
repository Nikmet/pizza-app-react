import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/api";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";
import cn from "classnames";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const DELIVERY_PRICE = 169;

export function Cart() {
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const navigate = useNavigate();

    const total = items
        .map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
                return 0;
            }
            return i.count * product.price;
        })
        .reduce((acc, i) => ((acc += i), 0));

    useEffect(() => {
        loadAllItems();
    }, [items]);

    const getItem = async (id: number) => {
        const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map((i) => getItem(i.id)));
        setCartProducts(res);
    };

    const checkout = async () => {
        await axios.post(
            `${PREFIX}/order`,
            {
                products: items
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        );
        navigate("/success");
    };

    return (
        <>
            <Headling style={{ marginBottom: "40px" }}>Корзина</Headling>
            {items.map((i) => {
                const product = cartProducts.find((p) => p.id === i.id);
                if (!product) {
                    return 0;
                }
                return <CartItem key={i.id} count={i.count} {...product} />;
            })}
            <div className={styles.wrapper}>
                <div className={styles.line}>
                    <div className={styles.title}>Итог</div>
                    <div className={styles.summa}>
                        {total}
                        <span className={styles.rub}>₽</span>
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.title}>Доставка</div>
                    <div className={styles.summa}>
                        {DELIVERY_PRICE}
                        <span className={styles.rub}>₽</span>
                    </div>
                </div>
                <div className={cn(styles.line, styles["no-line"])}>
                    <div className={styles.title}>Всего</div>
                    <div className={styles.summa}>
                        {total + DELIVERY_PRICE}
                        <span className={styles.rub}>₽</span>
                    </div>
                </div>
            </div>
            <div className={styles.order}>
                <Button appearance="big" onClick={checkout}>
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}
