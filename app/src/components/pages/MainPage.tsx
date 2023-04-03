import React, {FC, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../../App';
import Currency from '../../interfaces/currency';
import PurchaseModal from '../modals/PurchaseModal';
import CurrencyService from '../../api/CurrencyService';

const MainPage: FC = () => {
    const navigate = useNavigate();
    const {currencyList, setCurrencyList, isLoading, setIsLoading, selectedCurrency, setSelectedCurrency} = useContext(CurrencyContext);

    const getPage = ():number => {
        const page = localStorage.getItem('page');
        return page ? +page : 1
    } 

    const fetchData = async(limit = 10) => {
        const result = await CurrencyService.getAll(limit);
        setCurrencyList(result);
        setIsLoading(false);
    }

    const rowsLimit = 5;
    const pagesLimint = 20;
    const [page, setPage] = useState(getPage());
    const currentList = currencyList.slice((page - 1) * rowsLimit, page * rowsLimit);

    const changePage = (nextPage: number) => {
        if(nextPage === 1) {
            if(page * rowsLimit < currencyList.length) 
                setPage(page + nextPage);
        } else if(page > 1) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        localStorage.setItem('page', page.toString());
        fetchData(pagesLimint * rowsLimit);
    }, [page])


    const [purchaseModal, setPurchaseModal] = useState(false);

    const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, currency: Currency) => {
        e.stopPropagation();
        e.preventDefault();

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
                            <h4 className='price'>${Math.ceil(+currency.priceUsd * 100) / 100}</h4>
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
                <button 
                    className={page > 1 ? 'button' : 'button disabled'}
                    onClick={() => changePage(-1)}
                >
                    Previous page
                </button>
                <h2>{page}</h2>
                <button
                    className={page < pagesLimint ? 'button' : 'button disabled'} 
                    onClick={() => changePage(1)}
                >
                    Next page
                </button>
            </div>
        </div>
        </main>
    );
}

export default MainPage;
