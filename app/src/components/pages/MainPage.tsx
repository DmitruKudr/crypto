import React, {FC, useContext} from 'react';
import { CurrencyContext } from '../../App';

const MainPage: FC = () => {
    const {currencyList, isLoading} = useContext(CurrencyContext);

    return (
        <main className="main-page">
        <div className='wrapper'>
            {
                isLoading ? <p>Loading...</p> :
                <div className='currency-list'>
                    {currencyList.map(currency => 
                        <div className='item'>
                            <p>{currency.name}</p> 
                            <p>{currency.priceUsd} USD</p> 
                            <p>{currency.maxSupply ? `${currency.supply} / ${currency.maxSupply}` : currency.supply}</p>
                            <p>{currency.marketCapUsd}</p>
                            <p>{currency.volumeUsd24Hr}</p>
                            <p>{currency.changePercent24Hr}</p>
                            <p>{currency.vwap24Hr}</p>
                            <button>Add</button>
                        </div>
                    )}
                </div>
            }
        </div>
        </main>
    );
}

export default MainPage;
