import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../DataStore/Action';

const UserTable = () => {
  const users = useSelector((state) => state.users);
  
  const dispatch = useDispatch();

  const handleEdit = (userId, newName) => {
    dispatch(updateUser(userId, { name: newName }));
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>age</th>
          <th>date of birth</th>
          <th>phone Number</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
         
          <tr key={user.id}>
          {console.log(user,"who")}
            <td>{user?.name}</td>
            <td>{user?.age}</td>
            <td>{user?.dateOfBirth}</td>
            <td>{user?.phoneNumber}</td>
            <td>{user?.Address}</td>
            <td>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
