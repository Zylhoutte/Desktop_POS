import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaChartBar } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Customers = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [uniqueCustomerNames, setUniqueCustomerNames] = useState(new Set());
  const [uniqueIds, setUniqueIds] = useState(new Set());

  const getAllBills = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      const { data } = await axios.get('/api/bills/getbills');
      setBillsData(data);

      // Extracting unique customer names and IDs and updating the state
      const customerNames = data.map((customer) => customer.customerName);
      const ids = data.map((customer) => customer._id);
      setUniqueCustomerNames(new Set(customerNames));
      setUniqueIds(new Set(ids));

      dispatch({
        type: 'HIDE_LOADING',
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING',
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  // Calculate the counts for display
  const customerCount = uniqueCustomerNames.size;

  // Calculate today's sales
  const getTodaySales = () => {
    const today = new Date().toLocaleDateString();
    const todaySales = billsData
      .filter((bill) => new Date(bill.date).toLocaleDateString() === today)
      .reduce((total, customer) => total + customer.total, 0)
      .toFixed(2);

    return todaySales;
  };

  // Calculate the total sales and round off to two decimal places
  const totalSales = billsData.reduce((total, customer) => total + customer.total, 0).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {/* Customer Count */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">Customers</h2>
        <p className="text-3xl font-bold flex items-center">
          <FaUser className="mr-2" /> {customerCount}
        </p>
      </div>

      {/* Today's Sales */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
        <p className="text-3xl font-bold flex items-center">
          <FaChartBar className="mr-2" /> {getTodaySales()}
        </p>
      </div>

      {/* Total Sales */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">Sales</h2>
        <p className="text-3xl font-bold flex items-center">
          <FaChartBar className="mr-2" /> {totalSales}
        </p>
      </div>
    </div>
  );
};



export default Customers;
