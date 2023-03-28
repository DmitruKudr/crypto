import React, {FC, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import CurrencyService from '../api/CurrencyService';
import Currency from '../interfaces/currency';
import { CurrencyContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Header: FC = () => {
    const {currencyList, isLoading} = useContext(CurrencyContext);
    const currencyListTop = currencyList.slice(0, 3);

    const briefcase = 1234.56;

    return (
        <header className="header">
        <div className='wrapper'>
        <div className='header-content'>
            {
                isLoading ? <p>Loading...</p> :
                <div className='top-currency'>
                    {currencyListTop.map(currency => <span id={currency.id}>{currency.symbol}: {currency.priceUsd} USD</span>)}
                </div>
            }
            <div className='portfolio'>
                <i className="fa-solid fa-briefcase fa-2xl"></i>
                {briefcase} USD
            </div>
        </div>
        </div>
        </header>
    );
}

export default Header;
