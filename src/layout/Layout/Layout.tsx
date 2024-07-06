import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import cn from "classnames";

export function Layout() {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img className={styles.avatar} src="./avatar.png" alt="avatar" />
                    <div className={styles.name}>Никита Метлов</div>
                    <div className={styles.email}>metlov.nm@yandex.ru</div>
                </div>
                <div className={styles.menu}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive
                            })
                        }
                    >
                        <img src="./menu.svg" alt="меню" />
                        Меню
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive
                            })
                        }
                    >
                        <img src="./cart.svg" alt="корзина" />
                        Корзина
                    </NavLink>
                </div>
                <Button className={styles.exit}>
                    <img src="./off.svg" alt="exit" />
                    Выйти
                </Button>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
