import React, {FC, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../../App';
import Currency from '../../interfaces/currency';
import BriefcaseModal from '../modals/BriefcaseModal';
import PurchaseModal from '../modals/PurchaseModal';

const MainPage: FC = () => {
    const navigate = useNavigate();
    const {currencyList, isLoading, selectedCurrency, setSelectedCurrency} = useContext(CurrencyContext);


    const pageLimit = 3;
    const [page, setPage] = useState(1);
    const currentList = currencyList.slice((page - 1) * pageLimit, page * pageLimit);


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
                    {currentList.map(currency => 
                        <div className='item' key={currency.id} onClick={() => openCurrencyPage(currency)}>
                            <p>{currency.name}</p> 
                            <p>{currency.priceUsd} USD</p> 
                            <p>{currency.maxSupply ? `${currency.supply} / ${currency.maxSupply}` : currency.supply}</p>
                            <p>{currency.marketCapUsd}</p>
                            <p>{currency.volumeUsd24Hr}</p>
                            <p>{currency.changePercent24Hr}</p>
                            <p>{currency.vwap24Hr}</p>

                            <button onClick={(e) => openModal(e, currency)}>Add</button>
                        </div>
                    )}
                </div>
            }
            <button onClick={() => setPage(page - 1)}>prev</button>
            {page}
            <button onClick={() => setPage(page + 1)}>next</button>
        </div>
        </main>
    );
}

export default MainPage;
