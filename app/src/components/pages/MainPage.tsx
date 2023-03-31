import React, {FC, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../../App';
import Currency from '../../interfaces/currency';
import BriefcaseModal from '../modals/BriefcaseModal';
import PurchaseModal from '../modals/PurchaseModal';

const MainPage: FC = () => {
    const navigate = useNavigate();
    const {currencyList, isLoading, selectedCurrency, setSelectedCurrency} = useContext(CurrencyContext);


    const pageLimit = 5;
    const [page, setPage] = useState(1);
    const currentList = currencyList.slice((page - 1) * pageLimit, page * pageLimit);

    const changePage = (nextPage: number) => {
        if(nextPage == 1) {
            if(page * pageLimit <= currencyList.length) 
                setPage(page + nextPage)
        } else if(page > 1) {
            setPage(page - 1)
        }
    }


    const [purchaseModal, setPurchaseModal] = useState(false);

    const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, currency: Currency) => {
        e.stopPropagation();
        e.preventDefault();

        console.log(currency);
        setSelectedCurrency(currency);
        setPurchaseModal(true);
    }

    const openCurrencyPage = (currency: Currency) => {
        setSelectedCurrency(currency);
        navigate('/currency/' + currency.id);
        setPurchaseModal(false);
    }

    return (
        <main className="main-page">
        
        { selectedCurrency && <PurchaseModal modal={{visible: purchaseModal, setVisible: setPurchaseModal}} currency={selectedCurrency}/> }
        
        <div className='wrapper'>
            {
                isLoading ? <p>Loading...</p> :
                <div className='currency-list'>
                    <div className='item'>
                        <h3>Name</h3>
                        <h3>Price</h3>
                        <h3>24h%</h3>
                    </div>
                    {currentList.map(currency => 
                        <div className='item' key={currency.id} onClick={() => openCurrencyPage(currency)}>
                            <h4>{currency.name} {currency.symbol}</h4> 
                            <h4 className='price'>${(+currency.priceUsd).toFixed(2)}</h4>
                            <h4>{
                                +currency.changePercent24Hr >= 0 ?
                                <span className='plus'>+{(+currency.changePercent24Hr).toFixed(2)}%</span> :
                                <span className='minus'>{(+currency.changePercent24Hr).toFixed(2)}%</span>
                            }</h4>
                            <button className='button' onClick={(e) => openModal(e, currency)}>Purchase</button>
                        </div>
                    )}
                </div>
            }
            <div className='pagination'>
                <button className='button' onClick={() => changePage(-1)}>Previous page</button>
                <h2>{page}</h2>
                <button className='button' onClick={() => changePage(1)}>Next page</button>
            </div>
        </div>
        </main>
    );
}

export default MainPage;
