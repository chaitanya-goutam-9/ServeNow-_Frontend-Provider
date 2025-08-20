import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'customer');
  const [userId] = useState(localStorage.getItem('userId') || 'sample-user-id');
  const [newBooking, setNewBooking] = useState({
    bookingId: `B${Date.now()}`,
    customerId: userRole === 'customer' ? userId : 'sample-customer-id',
    providerId: '',
    serviceId: '',
    serviceType: '',
    bookingDate: '',
    time: '',
    additionalNotes: '',
  });
  const [services, setServices] = useState([]);
  const [providers] = useState([{ id: 'provider1', name: 'Sample Provider' }]);
  const [newService, setNewService] = useState({
    serviceType: '',
    description: '',
    price: '',
    duration: '',
  });
  const [editingService, setEditingService] = useState(null);

  // API Utility
  const API_URL = 'http://localhost:3000/api';
  const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
  });
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/bookings/history/${userRole}/${userId}`);
      setBookings(response.data.bookings);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async (providerId) => {
    try {
      const response = await api.get(`/services/${providerId}`);
      setServices(response.data.services);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error fetching services');
    }
  };

  const handleBookingAction = async (bookingId, status) => {
    try {
      setLoading(true);
      await api.patch(`/bookings/update-status/${bookingId}`, { status });
      toast.success(`Booking ${status} successfully`);
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating booking status');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (bookingId) => {
    try {
      setLoading(true);
      const response = await api.get(`/bookings/invoice/${bookingId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error downloading invoice');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    if (editingService) {
      setEditingService({ ...editingService, [name]: value });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBooking.bookingId || !newBooking.serviceId || !newBooking.bookingDate || !newBooking.time) {
      toast.error('Required fields: Booking ID, Service, Date, Time');
      return;
    }
    try {
      setLoading(true);
      const selectedService = services.find(s => s._id === newBooking.serviceId);
      await api.post('/bookings', {
        ...newBooking,
        customerId: userId,
        serviceType: selectedService?.serviceType || '',
        bookingDate: new Date(newBooking.bookingDate),
      });
      toast.success('Booking created successfully');
      setNewBooking({
        ...newBooking,
        bookingId: `B${Date.now()}`,
        serviceId: '',
        serviceType: '',
        bookingDate: '',
        time: '',
        additionalNotes: '',
      });
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    if (!newService.serviceType || !newService.price) {
      toast.error('Service Type and Price are required');
      return;
    }
    try {
      setLoading(true);
      await api.post('/services', { ...newService, providerId: userId });
      toast.success('Service created successfully');
      setNewService({ serviceType: '', description: '', price: '', duration: '' });
      fetchServices(userId);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error creating service');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!editingService.serviceType || !editingService.price) {
      toast.error('Service Type and Price are required');
      return;
    }
    try {
      setLoading(true);
      await api.patch(`/services/${editingService._id}`, editingService);
      toast.success('Service updated successfully');
      setEditingService(null);
      fetchServices(userId);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating service');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      setLoading(true);
      await api.delete(`/services/${serviceId}`);
      toast.success('Service deleted successfully');
      fetchServices(userId);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error deleting service');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchBookings();
        if (userRole === 'customer' && newBooking.providerId) {
          await fetchServices(newBooking.providerId);
        } else if (userRole === 'provider') {
          await fetchServices(userId);
        }
      } catch (error) {
        toast.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userRole, userId, newBooking.providerId]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage Bookings</h1>
      <p className="mb-8 text-center text-gray-600">
        {userRole === 'provider' ? 'Manage customer booking requests and services.' : 'View and create bookings.'}
      </p>

      {/* Role Toggle */}
      <div className="mb-6 text-center">
        <label className="mr-4">View as:</label>
        <select
          value={userRole}
          onChange={(e) => {
            setUserRole(e.target.value);
            localStorage.setItem('role', e.target.value);
            setNewBooking({
              ...newBooking,
              customerId: e.target.value === 'customer' ? userId : 'sample-customer-id',
              providerId: e.target.value === 'provider' ? userId : newBooking.providerId,
            });
          }}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="provider">Provider</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      {/* Service Management (Provider Only) */}
      {userRole === 'provider' && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manage Services</h2>
          <form onSubmit={editingService ? handleUpdateService : handleCreateService}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="serviceType"
                value={editingService ? editingService.serviceType : newService.serviceType}
                onChange={handleServiceInputChange}
                placeholder="Service Type (e.g., Cleaning)"
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="description"
                value={editingService ? editingService.description : newService.description}
                onChange={handleServiceInputChange}
                placeholder="Description (optional)"
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="price"
                value={editingService ? editingService.price : newService.price}
                onChange={handleServiceInputChange}
                placeholder="Price (e.g., 50)"
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="duration"
                value={editingService ? editingService.duration : newService.duration}
                onChange={handleServiceInputChange}
                placeholder="Duration (e.g., 1 hour)"
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Submitting...' : editingService ? 'Update Service' : 'Create Service'}
            </button>
            {editingService && (
              <button
                type="button"
                onClick={() => setEditingService(null)}
                disabled={loading}
                className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
              >
                Cancel Edit
              </button>
            )}
          </form>
          {loading ? (
            <p className="text-blue-500 text-center mt-4">Loading...</p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-600">Service Type</th>
                    <th className="px-6 py-3 text-left text-gray-600">Description</th>
                    <th className="px-6 py-3 text-left text-gray-600">Price</th>
                    <th className="px-6 py-3 text-left text-gray-600">Duration</th>
                    <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No services found
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service._id} className="border-t">
                        <td className="px-6 py-4">{service.serviceType}</td>
                        <td className="px-6 py-4">{service.description || 'N/A'}</td>
                        <td className="px-6 py-4">${service.price}</td>
                        <td className="px-6 py-4">{service.duration || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingService(service)}
                              disabled={loading}
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 disabled:bg-yellow-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteService(service._id)}
                              disabled={loading}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Form for New Booking (Customer Only) */}
      {userRole === 'customer' && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Booking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="bookingId"
              value={newBooking.bookingId}
              onChange={handleInputChange}
              placeholder="Booking ID (e.g., B123)"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              disabled
            />
            <select
              name="providerId"
              value={newBooking.providerId}
              onChange={(e) => {
                handleInputChange(e);
                fetchServices(e.target.value);
              }}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Provider</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
            <select
              name="serviceId"
              value={newBooking.serviceId}
              onChange={handleInputChange}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.serviceType} - ${service.price}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="bookingDate"
              value={newBooking.bookingDate}
              onChange={handleInputChange}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="time"
              name="time"
              value={newBooking.time}
              onChange={handleInputChange}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="additionalNotes"
              value={newBooking.additionalNotes}
              onChange={handleInputChange}
              placeholder="Additional Notes (optional)"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
              rows="4"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Submitting...' : 'Create Booking'}
          </button>
        </form>
      )}

      {/* Bookings Table */}
      {loading ? (
        <p className="text-blue-500 text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Booking ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Customer</th>
                <th className="px-6 py-3 text-left text-gray-600">Provider</th>
                <th className="px-6 py-3 text-left text-gray-600">Service</th>
                <th className="px-6 py-3 text-left text-gray-600">Date & Time</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Chat</th>
                <th className="px-6 py-3 text-left text-gray-600">Notes</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.bookingId} className="border-t">
                    <td className="px-6 py-4">{booking.bookingId}</td>
                    <td className="px-6 py-4">{booking.customerId?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{booking.providerId?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{booking.serviceType}</td>
                    <td className="px-6 py-4">{`${new Date(booking.bookingDate).toLocaleDateString()} ${booking.time}`}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          booking.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                          booking.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {booking.chatEnabled ? (
                        <span className="text-green-600">Enabled</span>
                      ) : (
                        <span className="text-gray-600">Disabled</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{booking.additionalNotes || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {userRole === 'provider' && booking.status === 'Pending' && (
                          <select
                            onChange={(e) => handleBookingAction(booking.bookingId, e.target.value)}
                            disabled={loading}
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                          >
                            <option value="">Update Status</option>
                            <option value="Accepted">Accept</option>
                            <option value="Rejected">Reject</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Complete</option>
                          </select>
                        )}
                        <button
                          onClick={() => handleDownloadInvoice(booking.bookingId)}
                          disabled={loading}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-blue-300"
                        >
                          Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ManageBookings;