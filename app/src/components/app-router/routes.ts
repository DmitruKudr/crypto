import MainPage from '../pages/MainPage'
import CurrencyPage from '../pages/CurrencyPage'

export const routes = [
    {
        path: "/",
        Page: MainPage
    },
    {
        path: '/currency/:id',
        Page: CurrencyPage
    },
]