import React, {FC, useState, useContext} from 'react'
import { CurrencyContext } from '../../App';
import Currency from '../../interfaces/currency';
import Modal from '../../interfaces/modal';

interface CombinedProps {
    modal: Modal,
    currency: Currency
};

const PurchaseModal: FC<CombinedProps> = ({modal, currency}) => {
    const {briefcase, setBriefcase} = useContext(CurrencyContext)
    const [value, setValue] = useState('1');

    const purchaseCurrency = () => {
        console.log(currency)
        currency.name in briefcase ?
        setBriefcase({...briefcase, [currency.name] : { 
            price: briefcase[currency.name].price + +currency.priceUsd * +value,
            value: briefcase[currency.name].value + +value
        }}) :
        setBriefcase({...briefcase, [currency.name] : {
            price: +currency.priceUsd * +value, 
            value: +value
        }});
    }

    return (
        <div 
            className={ modal.visible ? "purchase-modal active" : "purchase-modal" }
            onClick={() => modal.setVisible(false)}
        >
            <div className='content' onClick={e => e.stopPropagation()}>
                <h3>{currency.name}</h3>
                <input
                    placeholder='1'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <p>Total: {+value * +currency.priceUsd}</p>
                <button onClick={() => purchaseCurrency()}>Purchase</button>
            </div>
        </div>
    );
}

export default PurchaseModal;