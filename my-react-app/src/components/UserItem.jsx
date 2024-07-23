import React, { useState } from 'react';

function UserItem({ user, deleteUser, updateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

  const handleUpdate = () => {
    updateUser({ ...user, name, email, age });
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span>{name.length > 10 ? `${name.substring(0, 10)}...` : name}</span>
          <span>{email}</span>
          <span>{age}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default UserItem;
