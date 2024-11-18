import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddItemPanel from './AddItemPanel';
import axios from 'axios';

const Dashboard = () => {
  const [vegetables, setVegetables] = useState([]);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [showList, setShowList] = useState(false);
  const [editMode, setEditMode] = useState(null); 
  const [editData, setEditData] = useState({
    code: '',
    name: '',
    unitprice: '',
    quantity: '',
    image: ''
  });

  const fetchVegetables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vegetables/allvegetables');
      setVegetables(response.data);
    } catch (error) {
      toast.error('Failed to load vegetables. Please try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (showList) {
      fetchVegetables();
    }
  }, [showList]);

  const handleAddItem = (newVegetable) => {
    setVegetables((prev) => [...prev, newVegetable]);
    toast.success(`${newVegetable.name} added successfully!`);
    setShowAddPanel(false);
  };

  // Delete a vegetable by id
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vegetables/${id}`);
      setVegetables((prevVegetables) => prevVegetables.filter((veg) => veg._id !== id));
      toast.success('Vegetable removed successfully!');
    } catch (error) {
      console.error('Failed to delete vegetable:', error);
      toast.error('Failed to remove vegetable. Please try again.');
    }
  };

  // Edit vegetable inline
  const handleEditClick = (vegetable) => {
    setEditMode(vegetable._id);
    setEditData({
      code: vegetable.code,
      name: vegetable.name,
      unitprice: vegetable.unitprice,
      quantity: vegetable.quantity,
      image: vegetable.image
    });
  };

  // Handle input changes for editing data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save updated vegetable data
  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/vegetables/${editMode}`, editData);
      setVegetables((prevVegetables) =>
        prevVegetables.map((veg) =>
          veg._id === editMode ? response.data : veg
        )
      );
      toast.success('Vegetable updated successfully!');
      setEditMode(null);
      setEditData({
        code: '',
        name: '',
        unitprice: '',
        quantity: '',
        image: ''
      });
    } catch (error) {
      console.error('Failed to update vegetable:', error);
      toast.error('Failed to update vegetable. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="center-content">
        <h2>Vegetable Dashboard</h2>
      </div>

      <div className="dashboard-controls">
        <button className="btn view-list" onClick={() => setShowList(true)}>
          View List
        </button>
        <button className="btn add-item" onClick={() => setShowAddPanel((prev) => !prev)}>
          {showAddPanel ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {showAddPanel && <AddItemPanel onAddItem={handleAddItem} />}

      {showList && (
        <div className="vegetable-table-container">
          <table className="vegetable-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Image</th>
                <th>Name</th>
                <th>UnitPrice (Rs.)</th>
                <th>Quantity (kg)</th>
                <th>Action</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {vegetables.map((vegetable) => (
                <tr key={vegetable._id}>
                  <td>
                    {editMode === vegetable._id ? (
                      <input
                        name="code"
                        value={editData.code}
                        onChange={handleInputChange}
                      />
                    ) : (
                      vegetable.code
                    )}
                  </td>
                  <td>
                    {editMode === vegetable._id ? (
                      <input
                        name="image"
                        value={editData.image}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <img src={vegetable.image} alt={vegetable.name} className="vegetable-image" />
                    )}
                  </td>
                  <td>
                    {editMode === vegetable._id ? (
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      vegetable.name
                    )}
                  </td>
                  <td>
                    {editMode === vegetable._id ? (
                      <input
                        name="unitprice"
                        value={editData.unitprice}
                        onChange={handleInputChange}
                      />
                    ) : (
                      vegetable.unitprice
                    )}
                  </td>
                  <td>
                    {editMode === vegetable._id ? (
                      <input
                        name="quantity"
                        value={editData.quantity}
                        onChange={handleInputChange}
                      />
                    ) : (
                      vegetable.quantity
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleRemove(vegetable._id)} className="remove-button">Delete</button>
                  </td>
                  <td>
                    {editMode === vegetable._id ? (
                      <button onClick={handleEditSave} className="save-button">Save</button>
                    ) : (
                      <button onClick={() => handleEditClick(vegetable)} className="edit-button">Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
