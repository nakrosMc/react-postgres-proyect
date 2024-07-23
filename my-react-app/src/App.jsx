import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUserCount();
  }, []);

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', { name, email, age });
      console.log('User added:', response.data);
      fetchUserCount();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${editId}`, { name, email, age });
      console.log('User edited:', response.data);
      fetchUserCount();
      setEditId(null);
      setName('');
      setEmail('');
      setAge('');
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      console.log('User deleted');
      fetchUserCount();
      handleSearchUser();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/search', {
        params: { query: searchQuery },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUsers([]);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/count');
      setTotalUsers(response.data.total_users);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  return (
    <div className="container">
      <h1>Nakros Project</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={editId ? handleEditUser : handleAddUser}>
          {editId ? 'Edit User' : 'Add User'}
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearchUser}>Search User</button>
      </div>
      <div className="total-users">
        <h3>Total Users: {totalUsers}</h3>
      </div>
      <div className="results-container">
        {users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <button
              className="edit-button"
              onClick={() => {
                setEditId(user.id);
                setName(user.name);
                setEmail(user.email);
                setAge(user.age);
              }}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
