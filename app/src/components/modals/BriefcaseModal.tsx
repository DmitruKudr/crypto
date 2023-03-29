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
            <div className='content' onClick={e => e.stopPropagation()}>{
                Object.entries(briefcase).map(([key, value]) =>
                    <div>
                        <p>{key}</p>
                        <p>Cost: {value.price * value.value} Value: {value.value}</p>
                        <button onClick={() => removeCurrency(key)}>Remove</button>
                    </div>
                )
            }</div>
        </div>
    );
}

export default BriefcaseModal;