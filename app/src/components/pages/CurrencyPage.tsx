import React, {FC, useContext, useEffect, useState} from 'react';
import { CurrencyContext } from '../../App';
import CurrencyService from '../../api/CurrencyService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    });

    const data = history.map(item => {
        return {
            name: new Date(item.time).toLocaleString('en-US', {month: 'short', day: 'numeric'}),
            'price$': (+item.priceUsd).toFixed(2),
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
            <h2>Percent 24h: {
                +selectedCurrency.changePercent24Hr >= 0 ?
                <span className='plus'>+{(+selectedCurrency.changePercent24Hr).toFixed(4)}%</span> :
                <span className='minus'>{(+selectedCurrency.changePercent24Hr).toFixed(4)}%</span>
            }</h2>
            <h2>Market Cap: <span className='price'>${(+selectedCurrency.marketCapUsd).toFixed(4)}</span></h2>
            <h2>Volume 24h: <span className='price'>${(+selectedCurrency.volumeUsd24Hr).toFixed(4)}</span></h2>
            <h2>Supply: {
                selectedCurrency.maxSupply ? 
                <>{(+selectedCurrency.supply).toFixed(0)} / {(+selectedCurrency.maxSupply).toFixed(0)}</> : 
                (+selectedCurrency.supply).toFixed(0)
            }</h2>
            <h2>Rank: {selectedCurrency.rank}</h2>
            <button className='button' onClick={(e) => openModal(e)}>Purchase</button>
        </div>
        {
            isLoading ? <p>Loading...</p> :
            <div style={{width: '100%', maxWidth: 800, height: 250, zIndex: -1}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="price$" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
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
