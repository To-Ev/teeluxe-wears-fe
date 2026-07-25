import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slices/adminSlice';
import ROLES_LIST from '../../ROLES_LIST';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);
    const { users, loading, error } = useSelector(state => state.admin);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if(user && user.roles?.Admin !== ROLES_LIST.Admin) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        if(user && user.roles?.Admin === ROLES_LIST.Admin) {
            dispatch(fetchUsers());
        }
    }, [user, dispatch]);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        roles: {
            User: ROLES_LIST.User
        }
    });

    const handleChange = (e) => {
        if (e.target.name === "roles") {
            const selectedRole = e.target.value; // e.g. "admin"
            const roleKey = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1); // "Admin"
            setFormData({
            ...formData,
            roles: {
                ...formData.roles,
                [roleKey]: ROLES_LIST[roleKey]
            }
            });
        } else {
            setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        dispatch(addUser(formData));
        
        setFormData({
            name: "",
            email: "",
            password: "",
            roles: {
                User: ROLES_LIST.User
            }
        });
    }

    const handleRoleChange = (userId, newRole) => {
        const roleKey = newRole.charAt(0).toUpperCase() + newRole.slice(1); // "Admin"
        const updatedRoles = {
            ...users.find(u => u._id === userId).roles,
            [roleKey]: ROLES_LIST[roleKey]
        };

        dispatch(updateUser({ id: userId, roles: updatedRoles }));
    };

    const handleDeleteUser = (userId) =>{
        if(window.confirm("Are you sure you want to delete this User?")){
            dispatch(deleteUser(userId));
        }
    };

  return (
    <section className='max-w-7xl mx-auto py-6 text-gray-700 '>
        <h2 className="text-2xl font-bold mb-4">User Management</h2>

        {loading && <p className='text-xl text-green-300'>loading...</p>}
        {error && <p>Error: {typeof error === 'string' ? error : error.message}</p>}
        
        {/* Add new user Form  */}
        <div className='p-6 rounded-lg mb-6 shadow'>
            <h3 className='text-lg font-bold mb-4'>Add New User</h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-800">Name</label>
                    <input 
                        type="text" 
                        name='name' 
                        onChange={handleChange} 
                        value={formData.name}
                        className='w-full p-2 bg-gray-100 rounded  focus:outline-green-200 text-gray-700'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800">Email</label>
                    <input 
                        type="email" 
                        name='email' 
                        onChange={handleChange} 
                        value={formData.email}
                        className='w-full p-2 bg-gray-100 rounded  focus:outline-green-200 text-gray-700'
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-gray-800">Password</label>
                    <input 
                        type={showPassword ? "text" : "password"}  
                        name='password' 
                        onChange={handleChange} 
                        value={formData.password}
                        className='w-full p-2 bg-gray-100 rounded  focus:outline-green-200 text-gray-700'
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 cursor-pointer text-blue-400"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800">Role</label>
                    <select 
                        name='roles' 
                        onChange={handleChange} 
                        value={formData.roles}
                        className='w-full p-2 bg-gray-100 rounded  focus:outline-green-200 py-3'
                    >
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                        <option value="Courier">Courier</option>
                    </select>
                </div>
                <button
                    type='submit'
                    className='bg-green-500 text-white py-2.5 px-8 rounded hover:bg-green-600 cursor-pointer'
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
                    {users.map((user, index) =>(
                        <tr key={index} className='border-b border-gray-50 hover:bg-gray-50'>
                            <td className="p-4 text-gray-900 whitespace-nowrap">{user.name}</td>
                            <td className='p-4'>{user.email}</td>
                            <td className="p-4">
                                <select 
                                    value={user.roles} 
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className='p-2 border border-gray-400 rounded'
                                >
                                    <option value="Customer">Customer</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Courier">Courier</option>
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