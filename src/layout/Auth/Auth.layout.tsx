import { Outlet } from "react-router-dom";
import styles from "./Auth.module.css";

export function AuthLayout() {
    return (
        <div className={styles.layout}>
            <div className={styles.logo}>
                <img src="/pizza-app-react/auth-image.svg" alt="logo" />
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}
