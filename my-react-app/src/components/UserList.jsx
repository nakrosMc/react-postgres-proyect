import React from 'react';
import UserItem from './UserItem';

function UserList({ users, deleteUser, updateUser }) {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <UserItem key={user.id} user={user} deleteUser={deleteUser} updateUser={updateUser} />
        ))}
      </ul>
    </div>
  );
}

export default UserList;
