import React, {FC, useContext, useEffect, useState} from 'react';
import { CurrencyContext } from '../../App';
import CurrencyService from '../../api/CurrencyService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PurchaseModal from '../modals/PurchaseModal';

interface History {
    priceUsd: string,
    time: number
}

const CurrencyPage: FC = () => {
    const {selectedCurrency, setSelectedCurrency} = useContext(CurrencyContext);

    const [history, setHistory] = useState<History[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async() => {
      const result = await CurrencyService.getHistory(selectedCurrency?.id || 'bitcoin');
      setHistory(result);
      setIsLoading(false);
    }
    useEffect(() => {
      fetchData();
    }, []);

    const data = history.map(item => {
        return {
            price: +item.priceUsd,
        }
    })


    const [purchaseModal, setPurchaseModal] = useState(false);

    const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        setSelectedCurrency(selectedCurrency);
        setPurchaseModal(true);
    }

    return (
        <main className="currency-page">
        <div className='wrapper'>
        { selectedCurrency && 
        <div className='content'>
        <div>
            <PurchaseModal modal={{visible: purchaseModal, setVisible: setPurchaseModal}} currency={selectedCurrency}/>
            <h1>{selectedCurrency.name}</h1> 
            <h2>Price: <span className='price'>${(+selectedCurrency.priceUsd).toFixed(4)}</span></h2>
            <h2>Percent change for last 24 hours: {
                +selectedCurrency.changePercent24Hr >= 0 ?
                <span className='plus'>+{(+selectedCurrency.changePercent24Hr).toFixed(4)}%</span> :
                <span className='minus'>{(+selectedCurrency.changePercent24Hr).toFixed(4)}%</span>
            }</h2>
            <h2>Market Cap: <span className='price'>${(+selectedCurrency.marketCapUsd).toFixed(4)}</span></h2>
            <h2>Volume for last 24 hours: <span className='price'>${(+selectedCurrency.volumeUsd24Hr).toFixed(4)}</span></h2>
            <h2>Supply: {
                selectedCurrency.maxSupply ? 
                <>{(+selectedCurrency.supply).toFixed(0)} / {(+selectedCurrency.maxSupply).toFixed(0)}</> : 
                (+selectedCurrency.supply).toFixed(0)
            }</h2>
            <h2>Rank: {selectedCurrency.rank}</h2>
        </div>
        {
            isLoading ? <p>Loading...</p> :
            <div style={{width: 500, height: 250}}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={300} height={100} data={data}>
                        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        }
        </div>
        }
        </div>
        </main>
    );
}

export default CurrencyPage;
