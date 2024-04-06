import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../Admin/UserManagementComponent/Context';
import './Style.css';

const UserDetail = () => {
  const { users } = useUserContext();

  const params = useParams();
  const userId = parseInt(params.userId);

  // Lọc người dùng dựa trên userId khi component được render
  const filteredUsers = users.filter(user => user.id === userId);
  

  

  return (
    <>
      <div className='user-detail'>
        <div className='form-detail'>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id}>
                <h3>Images: <p><img className='detail-img-product' src={`${user.Images}`} alt="" /></p></h3>
                <h3>ID: <p>{user.id}</p></h3>
                <h3>Price: <p>{user.Price}</p></h3>
                <h3>Name: <p>{user.Name}</p></h3>
                <h3>CreatedAt: <p>{user.createdAt}</p></h3>
              </div>
            ))
          ) : (
            <p>User not found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetail;
