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
        modal.setVisible(false);
    }

    const TotalPrice = +value * +currency.priceUsd;
    const minValue = 0.0001;
    const maxValue = 999;

    return (
        <div 
            className={ modal.visible ? "purchase-modal active" : "purchase-modal" }
            onClick={() => modal.setVisible(false)}
        >
            <div className='content' onClick={e => e.stopPropagation()}>
                <h3>{currency.name}</h3>
                <input className='input'
                    type='number'
                    placeholder='How much currency do you want ot buy?'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <h4>Total: <span className='price'>${TotalPrice}</span></h4>
                {
                    +value >= minValue && +value < maxValue ?
                    <button className='button' onClick={() => purchaseCurrency()}>Purchase</button> :
                    <h4 className='minus'>Wrong value (min = {minValue}, max = {maxValue})</h4>
                }
            </div>
        </div>
    );
}

export default PurchaseModal;