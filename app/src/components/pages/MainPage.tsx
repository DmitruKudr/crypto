import React, {FC, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../../App';
import Currency from '../../interfaces/currency';

const MainPage: FC = () => {
    const {currencyList, isLoading, briefcase, setBriefcase, updateBriefcase} = useContext(CurrencyContext);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const pageLimit = 3;
    const currentList = currencyList.slice((page - 1) * pageLimit, page * pageLimit);

    const buyCurrency = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: Currency) => {
        e.stopPropagation();
        const value = 1;

        item.name in briefcase ? 
        setBriefcase({...briefcase, [item.name] : {value: briefcase[item.name].value + value, price: briefcase[item.name].price}}) :
        setBriefcase({...briefcase, [item.name] : {value: value, price: +item.priceUsd}});
        //updateBriefcase();
    }

    useEffect(() => {
        updateBriefcase()
    }, [briefcase])

    return (
        <main className="main-page">
        <div className='wrapper'>
            {
                isLoading ? <p>Loading...</p> :
                <div className='currency-list'>
                    {currentList.map(currency => 
                        <div className='item' key={currency.id} onClick={() => navigate('/currency/' + currency.id)}>
                            <p>{currency.name}</p> 
                            <p>{currency.priceUsd} USD</p> 
                            <p>{currency.maxSupply ? `${currency.supply} / ${currency.maxSupply}` : currency.supply}</p>
                            <p>{currency.marketCapUsd}</p>
                            <p>{currency.volumeUsd24Hr}</p>
                            <p>{currency.changePercent24Hr}</p>
                            <p>{currency.vwap24Hr}</p>

                            <button onClick={e => buyCurrency(e, currency)}>Add</button>
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
