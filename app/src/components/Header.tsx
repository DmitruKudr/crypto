import React, {FC, useContext} from 'react';

import { CurrencyContext } from '../App';

const Header: FC = () => {
    const {currencyList, isLoading, briefcase, setBriefcase} = useContext(CurrencyContext);
    const currencyListTop = currencyList.slice(0, 3);

    const briefcasePrice = briefcase.reduce((price, item) => price += item.price * item.value, 0)

    const resetBriefcase = () => {
        localStorage.setItem('briefcase', '');
        setBriefcase([])
    }

    return (
        <header className="header">
        <div className='wrapper'>
        <div className='header-content'>
            {
                isLoading ? <p>Loading...</p> :
                <div className='top-currency'>
                    {currencyListTop.map(currency => <span key={currency.id}>{currency.symbol}: {currency.priceUsd} USD</span>)}
                </div>
            }
            {
                isLoading ? <p>Loading...</p> :
                <div className='portfolio'>
                    <i className="fa-solid fa-briefcase fa-2xl"></i>
                    {briefcasePrice} USD
                    <button onClick={resetBriefcase}>reset</button>
                </div>
            }
        </div>
        </div>
        </header>
    );
}

export default Header;
