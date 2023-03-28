import React, {FC, useState, useEffect, createContext} from 'react';
import './App.css';
import AppRouter from './components/app-router/AppRouter';
import Header from './components/Header';
import Currency from './interfaces/currency';
import CurrencyService from './api/CurrencyService';

type ContextType = {
    currencyList: Currency[],
    isLoading: boolean
}

export const CurrencyContext = createContext<ContextType>({
    currencyList: [],
    isLoading: true
});

const App: FC = () => {
    const [currencyList, setCurrency] = useState<Currency[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async(limit = 10) => {
        const result = await CurrencyService.getAll(limit);
        setCurrency(result);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <CurrencyContext.Provider value = {{
            currencyList,
            isLoading
        }}>
            <Header />
            <AppRouter />
        </CurrencyContext.Provider>
    );
}

export default App;
