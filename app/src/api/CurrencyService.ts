import axios from 'axios'

export default class CurrencyService {
    static getAll = async (limit = 3) => {
        const response = await axios.get('https://api.coincap.io/v2/assets', {
            params: { limit: limit }
        });

        return response.data.data
    }
}