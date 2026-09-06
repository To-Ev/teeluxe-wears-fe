import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slices/adminSlice';
import ROLES_LIST from '../../ROLES_LIST';
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);
    const { users, loading, error } = useSelector(state => state.admin);
    const [showPassword, setShowPassword] = useState(false);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

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

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            await dispatch(addUser(formData)).unwrap(); // unwrap to catch errors
            toast.success("User added successfully!");
            setFormData({
            name: "",
            email: "",
            password: "",
            roles: { User: ROLES_LIST.User }
            });
        } catch (err) {
            toast.error(`Failed to add user: ${err.message || err}`);
        };
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const roleKey = newRole.charAt(0).toUpperCase() + newRole.slice(1); // "Admin"
            const updatedRoles = {
                ...users.find(u => u._id === userId).roles,
                [roleKey]: ROLES_LIST[roleKey]
            };
            await dispatch(updateUser({ id: userId, roles: updatedRoles })).unwrap();
            toast.success("Role updated successfully!");
        } catch (err) {
            toast.error(`Failed to update role: ${err.message || err}`);
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
                    <label className="text-gray-800 flex items-center bg-emerald-100 rounded-2xl py-2 px-3">
                        <FaUser className='w-5 h-5 text-gray-500'/>
                        <input 
                            type="text" 
                            name='name' 
                            onChange={handleChange} 
                            value={formData.name}
                            className='w-full p-2 focus:outline-none text-gray-700'
                            placeholder='Username'
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="text-gray-800 flex items-center bg-emerald-100 rounded-2xl py-2 px-3">
                        <FaEnvelope className='w-5 h-5 text-gray-500'/>
                        <input 
                            type="email" 
                            name='email' 
                            onChange={handleChange} 
                            value={formData.email}
                            placeholder='E-mail'
                            className='w-full p-2 focus:outline-none text-gray-700'
                        />
                    </label>
                    
                </div>
                <div className="mb-4 relative">
                    <label className="text-gray-800 flex items-center bg-emerald-100 rounded-2xl py-2 px-3">
                        <FaLock className='w-5 h-5 text-gray-500'/>
                        <input 
                            type={showPassword ? "text" : "password"}  
                            name='password' 
                            onChange={handleChange} 
                            value={formData.password}
                            placeholder='E-mail'
                            className='w-full p-2 focus:outline-none text-gray-700'
                        />
                    </label>
                    
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-5 cursor-pointer text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-gray-700">Role</label>
                    <select 
                        name='roles' 
                        onChange={handleChange} 
                        value={formData.roles}
                        className='w-full p-2 bg-gray-900 text-gray-300 rounded-lg  focus:outline-green-200 py-3'
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
                            <td className="p-4 text-gray-900 whitespace-nowrap">
                                {user.name}
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                    {user.roles ? Object.keys(user.roles).join(" / ") : "No roles"}
                                </div>
                            </td>
                            <td className='p-4'>{user.email}</td>
                            {/* Roles update */}
                            <td className="p-4">
                                <select
                                    value={user.roles ? Object.keys(user.roles)[0] : "Customer"}// show first role
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="p-2 border border-gray-400 rounded"
                                >
                                    <option value="Customer">Customer</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Courier">Courier</option>
                                </select>

                            </td>
                            <td className="p-4">
                                <button 
                                    onClick={() => {
                                        setUserToDelete(user._id);
                                        setShowModal(true);
                                    }}
                                    className='bg-red-500 text-white px-4 rounded hover:bg-red-600 py-1'
                                    >Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* Modal goes here, outside the form but inside the section */}
        {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Delete User</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-4">
                <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
                >
                Cancel
                </button>
                <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                    dispatch(deleteUser(userToDelete));
                    setShowModal(false);
                    setUserToDelete(null);
                }}
                >
                Delete
                </button>
            </div>
            </div>
        </div>)}
    </section>
  )
}

export default UserManagement