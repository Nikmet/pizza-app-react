import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useEffect } from "react";
import { RootState, typeAppDispatch } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    };
};

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeAppDispatch>();
    const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate("/");
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target;
        dispatch(register({ email: email.value, password: password.value, name: name.value }));
    };

    return (
        <div className={styles.login}>
            <Headling>Регистрация</Headling>
            {registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" name="email" type="email" placeholder="Email" />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input id="password" name="password" type="password" placeholder="Пароль" />
                </div>
                <div className={styles.field}>
                    <label htmlFor="name">Ваше имя</label>
                    <Input id="name" name="name" type="text" placeholder="Ваше имя" />
                </div>
                <Button className={styles.button} appearance="big">
                    Зарегистрироваться
                </Button>
                <div className={styles.text}>Уже есть аккаунт?</div>
                <div className={styles.link}>
                    <Link to="/auth/login">Войти</Link>
                </div>
            </form>
        </div>
    );
}
