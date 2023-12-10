import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart, deleteFromCart, clearCart } from '../features/cart/cartSlice'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';







const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [isPWD, setIsPWD] = useState(false);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashChange, setCashChange] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);




  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleCustomerPhoneChange = (event) => {
    setCustomerPhone(event.target.value);
  };

  const handleCustomerAddressChange = (event) => {
    setCustomerAddress(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCashChange = (event) => {
    const cashInput = parseFloat(event.target.value);
    const balance = cashInput - total;
    setCashChange(balance < 0 ? 0 : balance);
    setTotalBalance(balance < 0 ? -balance : 0);
  };

  
  const handleQuantityChange = (event, id) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      dispatch(updateCart({ _id: id, quantity }));
    }
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteFromCart({ _id: id }));
  };

  const handleClearCartClick = () => {
    dispatch(clearCart());
  };

  const subTotal = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

 

  

  const discount = (isPWD || isSeniorCitizen) ? subTotal * 0.2 : 0; // Assuming 20% discount for PWD and Senior Citizen
  const total = subTotal + subTotal * 0.1 - discount; // Assuming 10% tax

  const handleCreateInvoice = () => {
    const invoice = {
      cartItems,
      isPWD,
      isSeniorCitizen,
      subTotal,
      tax: subTotal * 0.1,
      discount,
      total,
       customerName,
       customerPhone,
       customerAddress,
      paymentMethod,
    };

    

    axios.post('/api/bills/addbills', invoice)
    .then(response => {
      console.log(response.data); // Handle response
      dispatch(clearCart());
   
      toast.success('Invoice created successfully!');
    })
    .catch(error => {
      console.log(error); // Handle error
      toast.error('Error creating invoice.');
    });

    dispatch(clearCart());
  

   
      // Assuming you have the necessary variables defined before using this code

const receipt = `
----------------------------------------
 Thank you for shopping with us!
----------------------------------------
Customer Name: ${customerName}
Phone: ${customerPhone}
Address: ${customerAddress}
Payment Method: ${paymentMethod}ßß
----------------------------------------
Items:
${cartItems.map(item => `${item.name} (${item.quantity}) - ₱${item.price.toFixed(2)}`).join('\n')}
----------------------------------------
Subtotal: ₱${subTotal.toFixed(2)}
Tax: ₱${((subTotal + discount) * 0.1).toFixed(2)}
${discount > 0 ? `Discount: ₱${discount.toFixed(2)}\n` : ''}
Total: ₱${total.toFixed(2)}
Cash: ₱${(total - cashChange).toFixed(2)}
Change: ₱${cashChange.toFixed(2)}
----------------------------------------
Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
`;

// Open print dialog
const printWindow = window.open('', 'Print Receipt');
printWindow.document.write(`<pre>${receipt}</pre>`);
printWindow.print();

 
    
    
  };

  return (
    <div>
      <div className="p-4"> {/* Assuming you're using a padding utility class */}
  <div>

    {/* ToastContainer component (if used) */}
    <h2 className="text-2xl font-bold mb-4">Customer Details</h2>

    {/* Replace TextField with standard input elements */}
    <input
      type="text"
      placeholder="Name"
      value={customerName}
      onChange={handleCustomerNameChange}
      className="border p-2 mb-2"
    />

    <input
      type="text"
      placeholder="Phone"
      value={customerPhone}
      onChange={handleCustomerPhoneChange}
      className="border p-2 mb-2"
    />

    <input
      type="text"
      placeholder="Address"
      value={customerAddress}
      onChange={handleCustomerAddressChange}
      className="border p-2 mb-4"
    />

    <h2 className="text-2xl font-bold mb-4">Payment Method</h2>

    {/* Replace Radio and FormControlLabel with standard input and label */}
    <label className="flex items-center mb-2">
      <input
        type="radio"
        value="cash"
        checked={paymentMethod === 'cash'}
        onChange={handlePaymentMethodChange}
        className="mr-2"
      />
      Cash
    </label>

    <label className="flex items-center mb-4">
      <input
        type="radio"
        value="credit card"
        checked={paymentMethod === 'credit card'}
        onChange={handlePaymentMethodChange}
        className="mr-2"
      />
      Credit Card
    </label>

    {/* Conditional rendering for Cash Payment section */}
    {paymentMethod === 'cash' && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Cash Payment</h2>
        <input
          type="number"
          placeholder="Amount Received"
          step="0.01"
          onChange={handleCashChange}
          className="border p-2 mb-2"
        />
        <p>Change: ₱{cashChange.toFixed(2)}</p>
        <p>Total Balance: ₱{totalBalance.toFixed(2)}</p>
      </div>
    )}

    <p className="text-xl font-bold mb-2">Total: ₱{total.toFixed(2)}</p>
    <button
      onClick={handleCreateInvoice}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Create Invoice
    </button>
  </div>
</div>
  
</div>
);
};

export default CartItems;