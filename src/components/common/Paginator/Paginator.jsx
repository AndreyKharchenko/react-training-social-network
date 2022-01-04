import React, {useState} from 'react';
import styles from "./Paginator.module.css";



let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);  // получаем кол-во страниц

    let pages = [];

    for(let i = 1; i <= pagesCount; i++) 
    {
        pages.push(i); // все страицы находятся здесь
    }

    let portionCount = Math.ceil(pagesCount / portionSize); // получаем кол-во порций страницы
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; // номер страницы левой границы порции
    let rightPortionPageNumber = portionNumber * portionSize; // номер страницы правой границы порции

    return (
    
        <div className={styles.paginator}>
            { portionNumber > 1 && 
            <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}

            { pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => { // если currentPage равна p, то прикрепится данный класс к span
                return <span className={currentPage === p ? [styles.selectedPage] : [styles.pageNumber]}
                key={p}
                onClick={ (e) => { 
                    onPageChanged(p); 
                } }>{p}</span> // пробегаемся по массиву количества всех странниц и выводим их по одной цифре // e-обработчик событя по умолчанию, можно не ставтьь
            })} 

            { portionCount > portionNumber && 
            <button onClick={() => { setPortionNumber(portionNumber + 1)}}>NEXT</button>}
        </div>
    
    );
}

export default Paginator;


