// import React, { useState, useContext } from 'react';
// import { TotalCostContext } from './Cart';
// import './Payment.css';

// const Payment = () => {
//     const totalCost = useContext(TotalCostContext);
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

//     const handlePaymentMethodChange = (e) => {
//         setSelectedPaymentMethod(e.target.value);
//     };

//     const paymentMethods = [
//         { name: 'Cash on Delivery (COD)', img: 'https://cdn-icons-png.flaticon.com/512/9198/9198191.png' },
//         { name: 'Google Pay (GPay)', img: 'https://images.indianexpress.com/2018/09/how-to-use-google-pay-759.jpg?w=414' },
//         { name: 'PhonePe', img: 'https://pbs.twimg.com/profile_images/1615271089705463811/v-emhrqu_400x400.png' },
//         { name: 'Net Banking', img: 'https://png.pngtree.com/element_our/png/20181108/internet-banking-line-icon-png_233993.jpg' },
//         { name: 'Credit/Debit Card', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfT0iYTa72XMxVbUUhal-BWm7iHuqDxe4YQ&s' },
//         { name: 'PayPal', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQntZEg1Wu9nzK4RtZAgnUMSu5WUSo4RP1ykA&s' },
//         { name: 'UPI', img: 'https://cdn.iconscout.com/icon/free/png-256/free-upi-2085056-1747946.png?f=webp' }
//     ];

//     return (
//         <>
//             <br/>
//             <div className="payment-container">
//                 <h3>Payment Methods</h3>
//                 <ul>
//                     {paymentMethods.map((method, index) => (
//                         <li key={index} className="payment-method-item">
//                             <div className="payment-method">
//                                 <img src={method.img} alt={method.name} className="payment-method-img" />
//                                 <h1 className="payment-method-title">{method.name}</h1>
//                                 <input
//                                     type="radio"
//                                     name="paymentMethod"
//                                     value={method.name}
//                                     checked={selectedPaymentMethod === method.name}
//                                     onChange={handlePaymentMethodChange}
//                                     className="payment-method-radio"
//                                 />
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//                 <button id='PaymentButton' disabled={!selectedPaymentMethod}>Proceed to pay ${totalCost}.00</button>
//             </div>
//         </>
//     );
// };

// export default Payment;
import React, { useState, useContext } from 'react';
import { TotalCostContext } from './Cart';
import './Payment.css';

const Payment = () => {
    const totalCost = useContext(TotalCostContext);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const paymentMethods = [
        { name: 'Cash on Delivery (COD)', img: 'https://cdn-icons-png.flaticon.com/512/9198/9198191.png' },
        { name: 'Google Pay (GPay)', img: 'https://images.indianexpress.com/2018/09/how-to-use-google-pay-759.jpg?w=414' },
        { name: 'PhonePe', img: 'https://pbs.twimg.com/profile_images/1615271089705463811/v-emhrqu_400x400.png' },
        { name: 'Net Banking', img: 'https://png.pngtree.com/element_our/png/20181108/internet-banking-line-icon-png_233993.jpg' },
        { name: 'Credit/Debit Card', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfT0iYTa72XMxVbUUhal-BWm7iHuqDxe4YQ&s' },
        { name: 'PayPal', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQntZEg1Wu9nzK4RtZAgnUMSu5WUSo4RP1ykA&s' },
        { name: 'UPI', img: 'https://cdn.iconscout.com/icon/free/png-256/free-upi-2085056-1747946.png?f=webp' }
    ];

    const handleProceedToPay = () => {
        if (selectedPaymentMethod) {
            // Show success message and proceed
            localStorage.removeItem('cart');
            alert('Order successfully proceeded!!');
            // Navigate to App.js or perform any other action
            // For demonstration, let's simulate navigation
            window.location.href = '/';
        } else {
            // Show error message if no payment method is selected
            alert('Please select any of the payment methods.');
        }
    };

    return (
        <>
            <br />
            <div className="payment-container">
                <h3>Payment Methods</h3>
                <ul>
                    {paymentMethods.map((method, index) => (
                        <li key={index} className="payment-method-item">
                            <div className="payment-method">
                                <img src={method.img} alt={method.name} className="payment-method-img" />
                                <h1 className="payment-method-title">{method.name}</h1>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.name}
                                    checked={selectedPaymentMethod === method.name}
                                    onChange={handlePaymentMethodChange}
                                    className="payment-method-radio"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleProceedToPay}
                    disabled={!selectedPaymentMethod}
                    id="PaymentButton"
                >
                    Proceed to pay ${totalCost}.00
                </button>

            </div>
        </>
    );
};

export default Payment;
