import React from 'react'
import PaystackPop from '@paystack/inline-js';


const PayStackButton = ({amount, email, onSuccess}) => {

    const handlePayment = () =>{
        const paystack = new PaystackPop();

        paystack.newTransaction({
            key: import.meta.env.VITE_PAYSTACK_CLIENT_ID,
            amount: amount * 100,
            email: email,
            onSuccess(transaction){
                alert(`Successful! Ref: ${transaction.reference}`);
                onSuccess()
            },
            onCancel() {
                alert(`You have Canceled the transaction`);
            }
        });
    }
    
  return (
    <button
        onClick={handlePayment}
        className='py-3 w-full bg-yellow-400 text-black text-2xl font-semibold italic rounded-lg cursor-pointer hover:bg-yellow-300'
    >
        Pay<span className='text-green-500'>Stack</span>
    </button>
  )
}

export default PayStackButton