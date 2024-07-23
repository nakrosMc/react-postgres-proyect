import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/users'; // Asegúrate de ajustar esto según tu configuración

const UserApp = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post(API_URL, { name, email, age });
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { name, email, age });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const searchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/${searchTerm}`);
      setUsers([response.data]);
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
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
      <button onClick={addUser}>Add User</button>
      <button onClick={searchUser}>Search User</button>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name.length > 10 ? `${user.name.slice(0, 10)}...` : user.name} - {user.email} - {user.age}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <button onClick={() => updateUser(user.id)}>Update</button>
          </li>
        ))}
      </ul>
      <p>Total Users: {users.length}</p>
    </div>
  );
};

export default UserApp;
