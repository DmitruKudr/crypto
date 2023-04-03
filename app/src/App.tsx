import React, {FC, useState, useEffect, createContext} from 'react';
import './App.css';
import AppRouter from './components/app-router/AppRouter';
import Header from './components/Header';
import Currency from './interfaces/currency';
import CurrencyService from './api/CurrencyService';
import Briefcase from './interfaces/briefcase';

type ContextType = {
    currencyList: Currency[],
    setCurrencyList: React.Dispatch<React.SetStateAction<Currency[]>> | (() => void),
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | (() => void),
    briefcase: Briefcase,
    setBriefcase: React.Dispatch<React.SetStateAction<Briefcase>> | (() => void)
    updateBriefcase: () => void,
    selectedCurrency: Currency | null,
    setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency | null>> | (() => void)
}

export const CurrencyContext = createContext<ContextType>({
    currencyList: [],
    setCurrencyList: () => {},
    isLoading: true,
    setIsLoading: () => {},
    briefcase: {},
    setBriefcase: () => {},
    updateBriefcase: () => {},
    selectedCurrency: null,
    setSelectedCurrency: () => {}
});

const App: FC = () => {
    const [currencyList, setCurrencyList] = useState<Currency[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [briefcase, setBriefcase] = useState<Briefcase>(getBriefcase())

    function getBriefcase(): Briefcase {
        const briefcase = localStorage.getItem('briefcase');
        return briefcase ? JSON.parse(briefcase) : {}
    }
    const updateBriefcase = () => {
        localStorage.setItem('briefcase', JSON.stringify(briefcase));
    }


    const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(getSelectedCurrency());
    function getSelectedCurrency(): Currency {
        const selectedCurrency = localStorage.getItem('selectedCurrency');
        return selectedCurrency ? JSON.parse(selectedCurrency) : null
    }
    const updateSelectedCurrency = () => {
        localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
    }
    useEffect(() => {
        updateSelectedCurrency();
        // eslint-disable-next-line
    }, [selectedCurrency]);

    return (
        <CurrencyContext.Provider value = {{
            currencyList,
            setCurrencyList,
            isLoading,
            setIsLoading,
            briefcase,
            setBriefcase,
            updateBriefcase,
            selectedCurrency,
            setSelectedCurrency
        }}>
            <Header />
            <AppRouter />
        </CurrencyContext.Provider>
    );
}

export default App;
