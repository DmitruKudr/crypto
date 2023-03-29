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

    const purchaseCurrency = (item: Currency) => {
        console.log(currency)
        item.name in briefcase ? 
        setBriefcase({...briefcase, [item.name] : {price: +item.priceUsd, value: briefcase[item.name].value + +value}}) :
        setBriefcase({...briefcase, [item.name] : {price: +item.priceUsd, value: +value}});
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
                <button onClick={() => purchaseCurrency(currency)}>Purchase</button>
            </div>
        </div>
    );
}

export default PurchaseModal;