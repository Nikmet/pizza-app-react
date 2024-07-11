import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RootState, typeAppDispatch } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeAppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);
    const items = useSelector((s: RootState) => s.cart.items);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        navigate("/auth/login");
    };

    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img className={styles.avatar} src="./avatar.png" alt="avatar" />
                    <div className={styles.name}>{profile?.name}</div>
                    <div className={styles.email}>{profile?.email}</div>
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
                        <img src="/pizza-app-react/menu.svg" alt="меню" />
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
                        <img src="/pizza-app-react/cart.svg" alt="корзина" />
                        Корзина
                        {items.length !== 0 && <span className={styles.count}>{items.length}</span>}
                    </NavLink>
                </div>
                <Button className={styles.exit} onClick={logout}>
                    <img src="/pizza-app-react/off.svg" alt="exit" />
                    Выйти
                </Button>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}
