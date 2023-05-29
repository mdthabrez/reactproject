import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import api from "../services/api";
function Remainder() {
  const [items, setItems] = useState([]);
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemDate, setNewItemDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (itemId) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        await api.delete(`/items/${itemId}`);
        fetchItems();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleViewPdf = async (circularId) => {
    try {
      const res = await api.get(`/circulars/${circularId}`, {
        responseType: 'arraybuffer',
      });
      const file = new Blob([res.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = async () => {
    if (newItemLabel.trim() !== '' && newItemDate.trim() !== '') {
      const newItem = { label: newItemLabel, date: newItemDate };

      try {
        await api.post('/items', newItem);
        fetchItems();
        setNewItemLabel('');
        setNewItemDate('');
        setError('');
      } catch (error) {
        console.error(error);
      }
    } else {
      setError('Enter values for both fields');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter item name"
                value={newItemLabel}
                onChange={(e) => setNewItemLabel(e.target.value)}
              />
              <input
                type="date"
                className="form-control"
                placeholder="Select a date"
                value={newItemDate}
                onChange={(e) => setNewItemDate(e.target.value)}
              />
              <button className="btn btn-light" onClick={handleAddItem}>
                Add Item
              </button>
            </div>
            {error && <div className="text-danger">{error}</div>}
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.r_id} style={{ transition: 'all 0.3s ease' }}>
                <td>{item.remainder}</td>
                <td>{formatDate(item.remainder_deadline)}</td>
                <td className="text-end ps-0">
                  {item.circular_id ? (
                    <button className="btn btn-outline-primary me-2" onClick={() => handleViewPdf(item.circular_id)}>
                      View PDF
                    </button>
                  ) : (
                    <span>Created by user</span>
                  )}
                </td>
                <td className="text-end ps-0">
                  <button className="btn btn-outline-danger" onClick={() => handleDelete(item.r_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Remainder;

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}