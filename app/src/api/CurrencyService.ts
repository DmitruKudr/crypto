import axios from 'axios'

export default class CurrencyService {
    static getAll = async (limit: number = 3) => {
        const response = await axios.get('https://api.coincap.io/v2/assets', {
            params: { limit: limit }
        });

        return response.data.data
    }
    static getHistory = async(currency: string) => {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${currency}/history`, {
            params: {
                interval: 'd1',
                start: Math.floor(Date.now()) - 1000 * 60 * 60 * 24 * 30, //previous month
                end: Math.floor(Date.now()) //now
            },
            headers: {
                'Authorization': 'Bearer 31def06e-f888-49b0-aedb-11c77cda8fca'
            }
        });
        console.log(response)
        return response.data.data
    }
}