// src/components/RefundForm.jsx
import { useState } from 'react';
import axios from '../axiosConfig'; // Import the configured Axios instance

const RefundForm = () => {
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/refunds', {
        orderId,
        reason,
        status: 'Pending'
      });
      alert('Refund request submitted successfully');
    } catch (error) {
      console.error('Error submitting refund request:', error);
      alert('Failed to submit refund request');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Request a Refund</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="orderId" className="block text-gray-700">Order ID</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700">Reason for Refund</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RefundForm;
