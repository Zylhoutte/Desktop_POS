import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Analytics = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [uniqueIds, setUniqueIds] = useState(new Set());


  const getAllBills = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      const { data } = await axios.get('/api/bills/getbills');
      setBillsData(data);

      // Extracting unique customer names and IDs and updating the state
      const ids = data.map((customer) => customer._id);
      setUniqueIds(new Set(ids));




      dispatch({
        type: 'HIDE_LOADING',
      });

   
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

  return (
    <>
      {billsData.length === 0 ? (
        <p>No customers available</p>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Customer Name</th>
                <th className="py-2 px-4 border-b">Total</th>
           
              </tr>
            </thead>
            <tbody>
              {billsData.map((customer) => (
                <tr key={customer._id}>
                  <td className="py-2 px-4 border-b">{customer._id}</td>
                  <td className="py-2 px-4 border-b">{customer.customerName}</td>
                  <td className="py-2 px-4 border-b">₱ {customer.total}</td>
         
                </tr>
              ))}
            </tbody>
          </table>
   
        </>
      )}
    </>
  );
};

export default Analytics;
