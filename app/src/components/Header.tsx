import React, {FC, useContext, useEffect, useState} from 'react';
import BriefcaseModal from './modals/BriefcaseModal';

import { CurrencyContext } from '../App';

const Header: FC = () => {
    const {currencyList, isLoading, briefcase, setBriefcase, updateBriefcase} = useContext(CurrencyContext);
    const currencyListTop = currencyList.slice(0, 3);

    useEffect(() => {
        updateBriefcase();
    }, [currencyList, briefcase])

    const briefcasePrice = Object.values(briefcase).reduce((total, item) => total += item.price, 0);
    const currentPrice = currencyList.reduce((total, item) => {
        return (item.name in briefcase) ? 
        total += +item.priceUsd * briefcase[item.name].value : total
    }, 0);
    const difference = currentPrice - briefcasePrice;
    const percent =  difference !== 0 ? difference / currentPrice : 0;

    const resetBriefcase = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        localStorage.setItem('briefcase', '');
        setBriefcase({});
    }

    const [briefcaseModal, setBriefcaseModal] = useState(false);
    const openModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        briefcasePrice ? setBriefcaseModal(true) : alert('Your portfolio is empty!')
    }

    return (
        <header className="header">
        
        <BriefcaseModal visible={briefcaseModal} setVisible={setBriefcaseModal} />

        <div className='wrapper'>
        <div className='content'>
            {
                isLoading ? <p>Loading...</p> :
                <div className='top-list'>
                    {currencyListTop.map(currency =>
                        <h3 key={currency.id}>{currency.symbol}: <span className='price'>${(+currency.priceUsd).toFixed(2)}</span></h3>
                    )}
                </div>
            }
            
            <div className='portfolio' onClick={e => openModal(e)}>
                <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                    <i className="fa-solid fa-briefcase fa-xl"></i>
                    <h3>Portfolio:</h3>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                <h3><span className='price'>{briefcasePrice ? '$' + +briefcasePrice.toFixed(2) : 'empty'}</span></h3>
                    { 
                        isLoading ? <p>Loading...</p> :
                        difference >= 0 ?
                        <h4 className="plus">+{+difference.toFixed(2)} ({+percent.toFixed(4)}%)</h4> :
                        <h4 className="minus">{+difference.toFixed(2)} ({+percent.toFixed(4)}%)</h4>
                    }
                </div>
                <button className='button' onClick={e => resetBriefcase(e)}>Reset</button>
            </div>
            
        </div>
        </div>
        </header>
    );
}

export default Header;
