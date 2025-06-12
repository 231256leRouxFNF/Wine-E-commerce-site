import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ErrorToast from '../components/ErrorToast';
import ConfirmModal from '../components/ConfirmModal';
import { AuthContext } from '../context/AuthContext';
import './AddProduct.css';

const ReviewProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const fetchPending = async () => {
    try {
      const res = await axios.get('/api/products/pending', {
        headers: { 'x-user-role': user?.role }
      });
      setProducts(res.data);
    } catch (err) {
      setError('Could not fetch products.');
    }
  };

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approve = async (id) => {
    try {
      await axios.put(`/api/products/${id}/approve`, null, {
        headers: { 'x-user-role': user?.role }
      });
      fetchPending();
    } catch (err) {
      setError('Could not approve product.');
    }
  };

  const reject = async () => {
    const id = confirmId;
    setConfirmId(null);
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { 'x-user-role': user?.role }
      });
      fetchPending();
    } catch (err) {
      setError('Could not delete product.');
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="form-title">Pending Products</h2>
      {products.length === 0 ? (
        <p>No products awaiting approval.</p>
      ) : (
        <ul className="wine-list-admin">
          {products.map((p) => (
            <li key={p._id} className="wine-list-item-admin">
              <div>
                <strong>{p.title}</strong> - R{p.price} | {p.type} | {p.region}
              </div>
              <div>
                <button className="delete-wine-btn" onClick={() => approve(p._id)}>
                  Approve
                </button>
                <button
                  className="delete-wine-btn"
                  onClick={() => setConfirmId(p._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {confirmId && (
        <ConfirmModal
          message="Are you sure you want to reject this wine?"
          onConfirm={reject}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default ReviewProducts;
