import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddItemPanel.css';
import axios from 'axios';

const AddItemPanel = ({ onAddItem }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [unitprice, setunitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !name || !unitprice || !quantity || !image) {
      toast.error('Please fill in all fields.');
      return;
    }

    const data = {
      code,
      name,
      unitprice,
      quantity,
      image,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/vegetables/add', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      onAddItem(response.data.vegetable);
      toast.success(`${name} has been added!`);
      setCode('');
      setName('');
      setunitPrice('');
      setQuantity('');
      setImage('');
    } catch (error) {
      toast.error('Failed to add item. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="add-item-panel">
      <h2 className="panel-title">Add New Vegetable Item</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            className="form-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., VEG-"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Vegetable Name:</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Carrot"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (Rs):</label>
          <input
            type="number"
            id="price"
            className="form-input"
            value={unitprice}
            onChange={(e) => setunitPrice(e.target.value)}
            placeholder="e.g., 50"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity (kg):</label>
          <input
            type="number"
            id="quantity"
            className="form-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            className="form-input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste Google Image URL"
            required
          />
        </div>

        <button type="submit" className="btn-submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemPanel;
