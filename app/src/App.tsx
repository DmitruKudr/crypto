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
    briefcase: Briefcase[],
    setBriefcase: React.Dispatch<React.SetStateAction<Briefcase[]>> | (() => void)
    updateBriefcase: ((briefcase: Briefcase) => void) | (() => void)
}

export const CurrencyContext = createContext<ContextType>({
    currencyList: [],
    isLoading: true,
    briefcase: [],
    setBriefcase: () => {},
    updateBriefcase: () => {}
});

const App: FC = () => {
    const [currencyList, setCurrency] = useState<Currency[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [briefcase, setBriefcase] = useState<Briefcase[]>(getBriefcase())

    const fetchData = async(limit = 10) => {
        const result = await CurrencyService.getAll(limit);
        setCurrency(result);
        setIsLoading(false);
    }

    function getBriefcase(): Briefcase[] {
        const briefcase = localStorage.getItem('briefcase');
        //console.log(briefcase);
        return briefcase ? JSON.parse(briefcase) : []
    }
    const updateBriefcase = (data: Briefcase) => {
        setBriefcase([...briefcase.filter(item => item.currency !== data.currency), data]);
        localStorage.setItem('briefcase', JSON.stringify(briefcase));
        //console.log(localStorage.getItem('briefcase'));
    }

    useEffect(() => {
        fetchData();
    }, [])

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
