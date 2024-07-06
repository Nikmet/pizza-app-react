import cn from "classnames";
import styles from "./Search.module.css";
import { forwardRef } from "react";
import { SearchProps } from "./Search.props";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <div className={styles["input-wrapper"]}>
            <img className={styles.icon} src="./search.svg" alt="лупа" />
            <input
                {...props}
                ref={ref}
                className={cn(styles.input, className, {
                    [styles.invalid]: !isValid
                })}
                placeholder="Введите блюдо или состав"
            />
        </div>
    );
});

export default Search;
