import React, {FC, useState, useEffect, createContext} from 'react';
import './App.css';
import AppRouter from './components/app-router/AppRouter';
import Header from './components/Header';
import Currency from './interfaces/currency';
import CurrencyService from './api/CurrencyService';
import Briefcase from './interfaces/briefcase';

type ContextType = {
    currencyList: Currency[],
    isLoading: boolean,
    briefcase: Briefcase,
    setBriefcase: React.Dispatch<React.SetStateAction<Briefcase>> | (() => void)
    updateBriefcase: () => void
}

export const CurrencyContext = createContext<ContextType>({
    currencyList: [],
    isLoading: true,
    briefcase: {},
    setBriefcase: () => {},
    updateBriefcase: () => {}
});

const App: FC = () => {
    const [currencyList, setCurrency] = useState<Currency[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [briefcase, setBriefcase] = useState<Briefcase>(getBriefcase())

    const fetchData = async(limit = 10) => {
        const result = await CurrencyService.getAll(limit);
        setCurrency(result);
        setIsLoading(false);
    }

    function getBriefcase(): Briefcase {
        const briefcase = localStorage.getItem('briefcase');
        return briefcase ? JSON.parse(briefcase) : {}
    }
    const updateBriefcase = () => {
        localStorage.setItem('briefcase', JSON.stringify(briefcase));
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        updateBriefcase()
    }, [briefcase])

    return (
        <CurrencyContext.Provider value = {{
            currencyList,
            isLoading,
            briefcase,
            setBriefcase,
            updateBriefcase
        }}>
            <Header />
            <AppRouter />
        </CurrencyContext.Provider>
    );
}

export default App;
