// src/components/RefundList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const RefundList = () => {
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await axios.get('/api/refunds');
        setRefunds(response.data);
      } catch (error) {
        console.error('Error fetching refunds:', error);
      }
    };

    fetchRefunds();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Your Refund Requests</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Reason</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map(refund => (
            <tr key={refund._id}>
              <td className="border border-gray-300 px-4 py-2">{refund.orderId}</td>
              <td className="border border-gray-300 px-4 py-2">{refund.reason}</td>
              <td className="border border-gray-300 px-4 py-2">{refund.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefundList;
