import { ChangeEvent, useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/api";
import { IProduct } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
                params: {
                    name
                }
            });
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <div className={styles.head}>
                <Headling>Меню</Headling>
                <Search onChange={updateFilter} />
            </div>
            <div>
                {!isLoading && products.length > 0 && <MenuList products={products} />}
                {isLoading && <>Готовим пиццу...</>}
                {!isLoading && products.length <= 0 && <>Ничего не найдено =(</>}
                {error && <>{error}</>}
            </div>
        </>
    );
}

export default Menu;
