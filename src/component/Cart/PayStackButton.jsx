import React from 'react'
import PaystackPop from '@paystack/inline-js';
import toast from 'react-hot-toast';


const PayStackButton = ({amount, email, onSuccess}) => {

    const handlePayment = () =>{
        const paystack = new PaystackPop();

        paystack.newTransaction({
            key: import.meta.env.VITE_PAYSTACK_CLIENT_ID,
            amount: amount * 100,
            email: email,
            onSuccess(transaction){ 
                toast.success(`Payment successful! wait to be redirected to Order confirmation page.`, {
                    position: "top-center",
                    duration: 6000,
                    style: {
                        background: "#16a34a", // Tailwind green-600
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "12px 20px",
                        fontWeight: "500",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#16a34a",
                    },
                });
                onSuccess(transaction);
            },
            onCancel() {
                toast.error("❌ Transaction canceled", {
                    position: "top-center",
                    duration: 5000,
                    style: {
                        background: "#1e1e1e",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "12px 20px",
                        fontWeight: "500",
                    },
                        iconTheme: {
                        primary: "#f87171", // red accent
                        secondary: "#fff",
                    },
                });
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