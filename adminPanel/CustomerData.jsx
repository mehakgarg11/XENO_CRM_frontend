import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { getAllCustomers } from '../services/customerService';

const CustomerData = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 bg-white rounded-xl shadow-sm border hover:bg-gray-50">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Data</h1>
            <p className="text-gray-600 mt-2">Manage all your customers.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Email</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Total Spend</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Visits</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Last Order</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center p-8">Loading customers...</td></tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{customer.name}</td>
                      <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                      <td className="px-6 py-4 text-gray-600">₹{customer.totalSpend?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4 text-gray-600">{customer.visits || 0}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {customer.lastOrderAt ? new Date(customer.lastOrderAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerData;