import React, { useState, useEffect } from "react";
import './PayView.css';
import { useParams } from "react-router-dom";
import axios from 'axios';

const PayView: React.FC = () => {
  const { post_id } = useParams<{ post_id: string }>();
  const [orderData, setOrderData] = useState<any>(null);
  const [paymentInput, setPaymentInput] = useState<number | string>('');
  const [transactionIdInput, setTransactionIdInput] = useState<string>('');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [deliveryAmount, setDeliveryAmount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/get_businessman_pending_payment_post_details/', {
          post_id,
        });
        setOrderData(response.data);
        const amount = parseFloat(response.data.amount);
        if (amount < 50) {
          setDeliveryAmount(200);
        } else if (amount > 50 && amount < 300) {
          setDeliveryAmount(400);
        } else {
          setDeliveryAmount(600);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchData();
  }, [post_id]);

  const total = orderData ? orderData.amount + orderData.deliveryMoney : 0;

  const handlePaymentSubmit = async () => {
    try {
      // Make a post request to register pending farmer payment
      console.log(orderData.location);
      await axios.post('http://127.0.0.1:8000/register_pending_farmer_payment/', {
        userid: orderData.farmer_userid,
        transaction_id: transactionIdInput,
        amount: orderData.amount,
        product_id: post_id,
        name: orderData.name,
        location: orderData.location,
      });

      // Handle payment submission logic here
      console.log('Payment Input:', paymentInput);
      console.log('Transaction ID Input:', transactionIdInput);

      // Simulate celebration after submission
      setShowCelebration(true);

      // Reset the celebration after a certain duration (1.5 seconds in this case)
      setTimeout(() => {
        setShowCelebration(false);
      }, 1500);

      // Add additional logic as needed
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <div className={`card ${showCelebration ? 'celebration' : ''}`}>
      <div className="title">Payment Form</div>

      {orderData ? (
        <div>
          <div className="row">
            <span className="heading"><strong>Post ID:</strong></span><br />
            <span className="details">{orderData.post_id}</span>
          </div>
          <div className="row">
            <span className="heading"><strong>Product Name:</strong></span><br />
            <span className="details">{orderData.name}</span>
          </div>
          <div className="row">
            <span className="heading"><strong>Amount:</strong></span><br />
            <span className="details">{orderData.amount} KG</span>
          </div>
          <div className="row">
            <span className="heading"><strong>Initial Price: {deliveryAmount}</strong></span><br />
            <span className="details">{orderData.price}</span>
          </div>
          <div className="row">
            <span className="heading"><strong>Delivery Money: {deliveryAmount}</strong></span><br />
            <span className="details">{orderData.deliveryMoney}</span>
          </div>
          <br/>

          <div className="payment-input-box">
            <label htmlFor="paymentInput">Enter Payment:</label>
            <input
              type="number"
              id="paymentInput"
              value={paymentInput}
              onChange={(e) => setPaymentInput(e.target.value)}
            />
          </div>

          <div className="transaction-id-input-box">
            <label htmlFor="transactionIdInput">Enter Transaction ID:</label>
            <input
              type="text"
              id="transactionIdInput"
              value={transactionIdInput}
              onChange={(e) => setTransactionIdInput(e.target.value)}
            />
          </div>

          <button className="submit-button" onClick={handlePaymentSubmit}>
            {showCelebration ? (
              <div className="tick-mark">&#10004;</div>
            ) : (
              'Submit Payment'
            )}
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PayView;
