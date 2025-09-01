import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faCheck,
  faTimes,
  faRefresh,
  faClock,
  faCalendar,
  faUser,
  faPhone,
  faEnvelope,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '16px',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: '1.25rem',
    color: '#64748b',
    marginBottom: '32px',
    textAlign: 'center',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  statCard: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e40af',
    display: 'block',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginTop: '4px',
  },
  filterContainer: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    fontSize: '0.875rem',
    minWidth: '120px',
  },
  card: {
    background: '#ffffff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    marginBottom: '32px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    background: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  th: {
    padding: '16px',
    textAlign: 'left',
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
  },
  td: {
    padding: '16px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.875rem',
    color: '#334155',
    verticalAlign: 'top',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  acceptButton: {
    backgroundColor: '#22c55e',
    color: 'white',
    marginRight: '8px',
  },
  rejectButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    marginRight: '8px',
  },
  refreshButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  backButton: {
    backgroundColor: '#6b7280',
    color: 'white',
  },
  viewButton: {
    backgroundColor: '#6366f1',
    color: 'white',
    marginRight: '8px',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '0.875rem',
    fontWeight: '500',
    textAlign: 'center',
    display: 'inline-block',
    minWidth: '80px',
  },
  pendingBadge: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  },
  acceptedBadge: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
  },
  rejectedBadge: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
  },
  completedBadge: {
    backgroundColor: '#e0e7ff',
    color: '#4f46e5',
  },
  cancelledBadge: {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
  },
  customerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  customerName: {
    fontWeight: '600',
    color: '#1e40af',
  },
  customerDetail: {
    fontSize: '0.75rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  bookingInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  bookingDetail: {
    fontSize: '0.875rem',
    color: '#334155',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#94a3b8',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '40px',
  },
  actionButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
};

const ManageBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('providerId') || '');
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    completed: 0,
    cancelled: 0,
  });
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (location.pathname !== '/') {
        console.log('No token found, navigating to /');
        toast.error('Please log in to continue');
        navigate('/', { replace: true });
      }
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        if (location.pathname !== '/') {
          console.log('Token expired, navigating to /');
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('providerId');
          navigate('/', { replace: true });
        }
        return false;
      }

      const providerId = decoded.user?.id || decoded.id;
      if (!providerId) {
        console.log('Token missing user ID, navigating to /');
        toast.error('Invalid token. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('providerId');
        navigate('/', { replace: true });
        return false;
      }

      try {
        console.log('Verifying provider for user:', providerId);
        const response = await api.get(`/booking/provider/${providerId}`);
        console.log('Provider verification response:', response.data);
        
        if (response.status === 200 && response.data.role === 'provider') {
          if (response.data.provider && response.data.provider.status === 'approved') {
            console.log('Provider access verified for user:', providerId);
            if (!userId) {
              setUserId(providerId);
              localStorage.setItem('providerId', providerId);
            }
            return true;
          } else {
            throw new Error('Provider not approved');
          }
        } else {
          throw new Error('Invalid provider verification response');
        }
      } catch (error) {
        console.error('Provider verification error:', {
          status: error.response?.status,
          message: error.response?.data?.msg || error.message,
          data: error.response?.data,
        });
        
        if (error.response?.status === 401) {
          toast.error('Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('providerId');
          navigate('/', { replace: true });
        } else if (error.response?.status === 403) {
          const errorMsg = error.response?.data?.msg || 'Access denied. You are not authorized as a provider.';
          toast.error(errorMsg);
          localStorage.removeItem('token');
          localStorage.removeItem('providerId');
          navigate('/', { replace: true });
        } else if (error.response?.status === 404) {
          toast.error('Provider not found. Please ensure your account is set up correctly.');
          localStorage.removeItem('token');
          localStorage.removeItem('providerId');
          navigate('/', { replace: true });
        } else {
          toast.error('Error verifying provider status. Please try again later.');
        }
        return false;
      }
    } catch (error) {
      console.error('Token validation error:', error);
      if (location.pathname !== '/') {
        console.log('Invalid token, navigating to /');
        toast.error('Invalid token. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('providerId');
        navigate('/', { replace: true });
      }
      return false;
    }
  };

  const fetchBookings = async () => {
    if (!userId) {
      if (location.pathname !== '/') {
        console.log('No userId, navigating to /');
        toast.error('Provider ID not found. Please log in again.');
        navigate('/', { replace: true });
      }
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching bookings for provider:', userId);
      const response = await api.get(`/booking/booking/provider/${userId}`);
      console.log('Bookings response:', response.data);

      const bookingsData = Array.isArray(response.data) ? response.data : [];
      setBookings(bookingsData);

      const newStats = {
        total: bookingsData.length,
        pending: bookingsData.filter((b) => b.status === 'pending').length,
        accepted: bookingsData.filter((b) => b.status === 'accepted').length,
        rejected: bookingsData.filter((b) => b.status === 'rejected').length,
        completed: bookingsData.filter((b) => b.status === 'completed').length,
        cancelled: bookingsData.filter((b) => b.status === 'cancelled').length,
      };
      setStats(newStats);

      toast.success('Bookings refreshed successfully');
    } catch (error) {
      console.error('Fetch bookings error:', {
        status: error.response?.status,
        message: error.response?.data?.msg || error.message,
        data: error.response?.data,
      });
      const errorMsg = error.response?.data?.msg || 'Error fetching bookings';
      toast.error(errorMsg);

      if (error.response?.status === 401 || error.response?.status === 403) {
        if (location.pathname !== '/') {
          console.log('Unauthorized, navigating to /');
          localStorage.removeItem('token');
          localStorage.removeItem('providerId');
          toast.error(error.response?.data?.msg || 'Session invalid. Please log in again.');
          navigate('/', { replace: true });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (serviceId, status) => {
    setLoading(true);
    try {
      console.log(`Updating booking ${serviceId} to status: ${status}`);
      await api.put(`/booking/status/${serviceId}`, { status });
      toast.success(`Booking ${status} successfully`);
      await fetchBookings();
    } catch (error) {
      console.error('Update booking error:', {
        status: error.response?.status,
        message: error.response?.data?.msg || error.message,
        data: error.response?.data,
      });
      const errorMsg =
        error.response?.status === 403 && error.response?.data?.msg.includes('service is not approved')
          ? 'Cannot update booking: The associated service is not approved. Please contact the admin.'
          : error.response?.data?.msg || 'Error updating booking status';
      toast.error(errorMsg);
      if (error.response?.status === 401) {
        if (location.pathname !== '/') {
          console.log('Unauthorized, navigating to /');
          localStorage.removeItem('token');
          localStorage.removeItem('providerId');
          toast.error('Session invalid. Please log in again.');
          navigate('/', { replace: true });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeStyle = (status) => {
    const baseStyle = styles.statusBadge;
    switch (status?.toLowerCase()) {
      case 'accepted':
        return { ...baseStyle, ...styles.acceptedBadge };
      case 'rejected':
        return { ...baseStyle, ...styles.rejectedBadge };
      case 'completed':
        return { ...baseStyle, ...styles.completedBadge };
      case 'cancelled':
        return { ...baseStyle, ...styles.cancelledBadge };
      default:
        return { ...baseStyle, ...styles.pendingBadge };
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    return timeString;
  };

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter((booking) => booking.status === statusFilter));
    }
  }, [bookings, statusFilter]);

  useEffect(() => {
    if (!isAuthChecked) {
      setIsAuthChecked(true);
      checkAuth().then((isAuthenticated) => {
        if (isAuthenticated) {
          fetchBookings();
        }
      });
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Manage Customer Bookings</h1>
      <p style={styles.subHeading}>Review and manage incoming booking requests</p>
      
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <span style={styles.statNumber}>{stats.total}</span>
          <div style={styles.statLabel}>Total Bookings</div>
        </div>
        <div style={styles.statCard}>
          <span style={{ ...styles.statNumber, color: '#d97706' }}>{stats.pending}</span>
          <div style={styles.statLabel}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <span style={{ ...styles.statNumber, color: '#15803d' }}>{stats.accepted}</span>
          <div style={styles.statLabel}>Accepted</div>
        </div>
        <div style={styles.statCard}>
          <span style={{ ...styles.statNumber, color: '#4f46e5' }}>{stats.completed}</span>
          <div style={styles.statLabel}>Completed</div>
        </div>
      </div>
      
      <div style={styles.filterContainer}>
        <button
          onClick={() => {
            console.log('Back button clicked, navigating to /dashboard');
            navigate('/dashboard');
          }}
          style={{
            ...styles.button,
            ...styles.backButton,
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        <label>Filter by Status:</label>
        <select
          style={styles.select}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Bookings</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          onClick={fetchBookings}
          disabled={loading}
          style={{
            ...styles.button,
            ...styles.refreshButton,
            ...(loading ? styles.buttonDisabled : {}),
          }}
        >
          <FontAwesomeIcon icon={faRefresh} />
          Refresh Bookings
        </button>
      </div>
      
      <div style={styles.card}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              style={{ marginRight: '8px', fontSize: '1.5rem', color: '#3b82f6' }}
            />
            <p>Loading bookings...</p>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Customer Details</th>
                  <th style={styles.th}>Booking Info</th>
                  <th style={styles.th}>Booking ID</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={styles.emptyState}>
                      {statusFilter === 'all'
                        ? 'No booking requests found'
                        : `No ${statusFilter} bookings found`}
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td style={styles.td}>
                        <div style={styles.customerInfo}>
                          <div style={styles.customerName}>
                            <FontAwesomeIcon icon={faUser} style={{ marginRight: '6px' }} />
                            {booking.customerName}
                          </div>
                          <div style={styles.customerDetail}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            {booking.customerEmail}
                          </div>
                          <div style={styles.customerDetail}>
                            <FontAwesomeIcon icon={faPhone} />
                            {booking.customerNumber}
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.bookingInfo}>
                          <div style={styles.bookingDetail}>
                            <FontAwesomeIcon icon={faCalendar} />
                            {formatDate(booking.bookingDate)}
                          </div>
                          <div style={styles.bookingDetail}>
                            <FontAwesomeIcon icon={faClock} />
                            {formatTime(booking.bookingTime)} ({booking.bookingSlot})
                          </div>
                          {booking.additionalNotes && (
                            <div style={{ ...styles.bookingDetail, fontSize: '0.75rem', fontStyle: 'italic' }}>
                              Note: {booking.additionalNotes}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <code
                          style={{
                            backgroundColor: '#f1f5f9',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                          }}
                        >
                          {booking.bookingId}
                        </code>
                      </td>
                      <td style={styles.td}>
                        <span style={getStatusBadgeStyle(booking.status)}>{booking.status || 'Pending'}</span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actionButtons}>
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleBookingAction(booking._id, 'accepted')}
                                disabled={loading}
                                style={{
                                  ...styles.button,
                                  ...styles.acceptButton,
                                  ...(loading ? styles.buttonDisabled : {}),
                                }}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                                Accept
                              </button>
                              <button
                                onClick={() => handleBookingAction(booking._id, 'rejected')}
                                disabled={loading}
                                style={{
                                  ...styles.button,
                                  ...styles.rejectButton,
                                  ...(loading ? styles.buttonDisabled : {}),
                                }}
                              >
                                <FontAwesomeIcon icon={faTimes} />
                                Reject
                              </button>
                            </>
                          )}
                          {booking.status === 'accepted' && (
                            <button
                              onClick={() => handleBookingAction(booking._id, 'completed')}
                              disabled={loading}
                              style={{
                                ...styles.button,
                                ...styles.completedBadge,
                                color: 'white',
                                ...(loading ? styles.buttonDisabled : {}),
                              }}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                              Mark Complete
                            </button>
                          )}
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ManageBookings;