import './Style.css'
import { FC, useState, createContext, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useUserContext } from './Context';
import { instance } from "../../../axios-instance";

const TableListUser = ({reloadPage,  showEdit, setItem}) => {
  const { users, setUsers } = useUserContext();

  
    // Hàm xử lý xóa user theo index


    const handleDelete = (id) => {
      /* const updatedList = [...users];
      updatedList.splice(index, 1);

      // Nếu bạn cần cập nhật component cha, gọi hàm update
    
        setUsers(updatedList); */
        instance.delete(`user/${id}`)
        .then(() => {
          const updatedList = users.filter(user => user.id !== id);
        setUsers(updatedList);
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });;
    };


    /* const handleEdit = (index) =>{
      showEdit(true)
      const selectItem = listUser.filter((item, i)=>i === index)
      console.log(selectItem)
      
    } */
    const handleEdit = (index) => {
      // Lấy người dùng cần chỉnh sửa từ listUser và chuyển cho BoxForm
      const editedUser = { ...users[index] }; // Tạo một bản sao để tránh ảnh hưởng đến listUser gốc
      
      // Cập nhật state để hiển thị BoxForm ở chế độ chỉnh sửa
      showEdit();
  
      // Chuyển thông tin của người dùng cần chỉnh sửa cho BoxForm
      setItem(editedUser);
    };
  
    useEffect(()=> {

      instance.get('user').then(response => {
        setUsers (response.data)
       
      })
  
    },[])
    
   



    return (
      <>
        <div className="box-table-user">
          <table className="table-list-user">
            <tr>
              {/* <th>STT</th> */}
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              {/* <th>Description</th> */}
              <th>CreatedAt</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {users.map((user, index) => (
                
              <tr key={index}>
                
                <td>{user.id}</td>
                
                {/* <td>
                  <Link to={`/user-detail/${user.id}`}><img className='img-product' src={`${user.Images}`} alt="" /></Link>
                </td> */}
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Password}</td>
                <td>{user.createdAt}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  };


export default TableListUser