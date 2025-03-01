import React, { useState, useContext } from 'react';
import { TotalCostContext } from './Cart';
import './Payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const totalCost = useContext(TotalCostContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleProceedToPay = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }
    alert("Order placed successfully");
    localStorage.removeItem('cart');
    localStorage.removeItem('order');
    navigate('/');
    window.location.reload();

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

  return (
    <>
      <br/>
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
          id='PaymentButton'
          onClick={handleProceedToPay}
        >
          Proceed to pay ${totalCost}.00
        </button>
      </div>
    </>
  );
};

export default Payment;
