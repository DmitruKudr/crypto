import React, {FC, useContext} from 'react'
import { CurrencyContext } from '../../App';
import Modal from '../../interfaces/modal';

const BriefcaseModal: FC<Modal> = ({visible, setVisible}) => {
    const {briefcase, setBriefcase} = useContext(CurrencyContext)

    const removeCurrency = (currency: string) => {
        setBriefcase(prev => {
            const { [currency]: removeCurrency, ...rest } = prev;
            return rest;
        })
    }

    return (
        <div 
            className={ visible ? "briefcase-modal active" : "briefcase-modal" }
            onClick={() => setVisible(false)}
        >
            <div className='content' onClick={e => e.stopPropagation()}>
            <div className='list'>
                <div className='item'>
                    <h4>Name</h4>
                    <h4>Amount</h4>
                    <h4>Purchase Costs</h4>
                </div>
            {
                Object.entries(briefcase).map(([key, value]) =>
                    <div className='item'>
                        <h3>{key}</h3>
                        <h3>{value.value}</h3>
                        <h3><span className='price'>${(+value.price).toFixed(4)}</span></h3>
                        <button className='button' onClick={() => removeCurrency(key)}>Remove</button>
                    </div>
                )
            }
            </div>
            </div>
        </div>
    );
}

export default BriefcaseModal;