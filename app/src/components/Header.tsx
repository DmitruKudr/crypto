import React, {FC, useContext, useState} from 'react';
import BriefcaseModal from './modals/BriefcaseModal';

import { CurrencyContext } from '../App';

const Header: FC = () => {
    const {currencyList, isLoading, briefcase, setBriefcase} = useContext(CurrencyContext);
    const currencyListTop = currencyList.slice(0, 3);

    //const briefcasePrice = briefcase.reduce((price, item) => price += item.price * item.value, 0)
    const briefcasePrice = Object.values(briefcase).reduce((total, item) => total += item.price, 0);
    const currentPrice = currencyList.reduce((total, item) => {
        return (item.name in briefcase) ? 
        total += +item.priceUsd * briefcase[item.name].value : total
    }, 0);
    const difference = currentPrice - briefcasePrice;
    const percent =  difference !== 0 ? difference / currentPrice : 0;

    const resetBriefcase = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        localStorage.setItem('briefcase', '')
        setBriefcase({})
    }

    const [briefcaseModal, setBriefcaseModal] = useState(false);

    return (
        <header className="header">

        <BriefcaseModal visible={briefcaseModal} setVisible={setBriefcaseModal} />

        <div className='wrapper'>
        <div className='header-content'>
            {
                isLoading ? <p>Loading...</p> :
                <div className='top-currency'>
                    {currencyListTop.map(currency => <span key={currency.id}>{currency.symbol}: {currency.priceUsd} USD</span>)}
                </div>
            }
            
            <div className='briefcase' onClick={() => setBriefcaseModal(true)}>
                <i className="fa-solid fa-briefcase fa-2xl"></i>
                {briefcasePrice} USD
                {
                    isLoading ? <p>Loading...</p> :
                    difference >= 0 ? 
                    <p style={{color: 'green'}}>+{difference} ({percent} %)</p> :
                    <p style={{color: 'red'}}>{difference} ({percent} %)</p>
                }
                <button onClick={e => resetBriefcase(e)}>reset</button>
            </div>
            
        </div>
        </div>
        </header>
    );
}

export default Header;
