import axios from 'axios'

export default class CurrencyService {
    static getAll = async (limit: number = 3) => {
        const response = await axios.get('https://api.coincap.io/v2/assets', {
            params: { limit: limit }
        });

        return response.data.data
    }
    static getHistory = async(currency: string, interval: string = 'd1') => {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${currency}/history?interval=${interval}`);
        return response.data.data
    }
}