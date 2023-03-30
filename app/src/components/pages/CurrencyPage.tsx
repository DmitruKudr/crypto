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
        { selectedCurrency && <PurchaseModal modal={{visible: purchaseModal, setVisible: setPurchaseModal}} currency={selectedCurrency}/> }
            <h1>{selectedCurrency?.name}</h1>
            {
                isLoading ? <p>Loading...</p> :
                <div style={{width: 500, height: 500}}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={300} height={100} data={data}>
                        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            }
            <p>{selectedCurrency?.priceUsd} USD</p> 
            <p>{selectedCurrency?.maxSupply ? `${selectedCurrency.supply} / ${selectedCurrency.maxSupply}` : selectedCurrency?.supply}</p>
            <p>{selectedCurrency?.marketCapUsd}</p>
            <p>{selectedCurrency?.volumeUsd24Hr}</p>
            <p>{selectedCurrency?.changePercent24Hr}</p>
            <p>{selectedCurrency?.vwap24Hr}</p>
            <button onClick={(e) => openModal(e)}>Add</button>
        </main>
    );
}

export default CurrencyPage;
