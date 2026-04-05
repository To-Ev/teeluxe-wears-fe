import React, { useState } from 'react'

const UserManagement = () => {
    const users = [
        {
            _id: 11323,
            name: "Zaynab Tinuola",
            email: "zaynab@gmail.com",
            role: "admin"
        },
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer" //Default
    });

    const handleChange = (e) =>{
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer"
        });
        console.log(formData);
    }

    const handleRoleChange = (userId, newRole) =>{
        console.log({Id: userId, role: newRole});
    }

    const handleDeleteUser = (userId) =>{
        if(window.confirm("Are you sure you want to delete this User?")){
            console.log("Deleting user with ID", userId);
        }
    }

  return (
    <section className='max-w-7xl mx-auto p-6 text-gray-700 '>
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        {/* Add new user Form  */}
        <div className='p-6 rounded-lg mb-6'>
            <h3 className='text-lg font-bold mb-4'>Add New User</h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input 
                        type="text" 
                        name='name' 
                        onChange={handleChange} 
                        value={formData.name}
                        className='w-full p-2 bg-gray-100 rounded  focus:outline-green-200'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                        type="email" 
                        name='email' 
                        onChange={handleChange} 
                        value={formData.email}
                        className='w-full p-2 bg-gray-100 rounded  focus:outline-green-200'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input 
                        type="password" 
                        name='password' 
                        onChange={handleChange} 
                        value={formData.password}
                        className='w-full p-2 bg-gray-100 rounded  focus:outline-green-200'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select 
                        name='role' 
                        onChange={handleChange} 
                        value={formData.role}
                        className='w-full p-2 bg-gray-100 rounded  focus:outline-green-200 py-3'
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type='submit'
                    className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer'
                >Add User</button>
            </form>
        </div>
        {/* User List Management  */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                    <tr>
                        <th className='py-3 px-4'>Name</th>
                        <th className='py-3 px-4'>Email</th>
                        <th className='py-3 px-4'>Role</th>
                        <th className='py-3 px-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>(
                        <tr key={user._id} className='border-b border-gray-50 hover:bg-gray-50'>
                            <td className="p-4 text-gray-900 whitespace-nowrap">{user.name}</td>
                            <td className='p-4'>{user.email}</td>
                            <td className="p-4">
                                <select 
                                    value={user.role} 
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className='p-2 border border-gray-400 rounded'
                                >
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="p-4">
                                <button 
                                    onClick={() =>handleDeleteUser(user._id)}
                                    className='bg-red-500 text-white px-4 rounded hover:bg-red-600'
                                    >Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
  )
}

export default UserManagement