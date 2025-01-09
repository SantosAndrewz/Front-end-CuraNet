import React, { useState } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Gray', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Gray', email: 'jane@example.com', role: 'Prescriber' },
        { id: 3, name: 'Mike gray', email: 'mike@example.com', role: 'Pharmacist' },
        { id: 4, name: 'Lucy gray', email: 'lucy@example.com', role: 'Triage_nurse' },
    ]);

    const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
    const [editUserId, setEditUserId] = useState(null);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    };

    // new user
    const handleAddUser = () => {
        if (newUser.name && newUser.email && newUser.role) {
            setUsers([
            ...users,
            { id: users.length + 1, name: newUser.name, email: newUser.email, role: newUser.role },
        ]);
        setNewUser({ name: '', email: '', role: '' });
        } else {
        alert('Please fill all fields!');
    }
};

    const handleEditUser = (user) => {
        setEditUserId(user.id);
        setNewUser(user);
    };

    const handleSaveUser = () => {
        setUsers(
        users.map((user) =>
        user.id === editUserId ? { ...user, name: newUser.name, email: newUser.email, role: newUser.role } : user
        )
        );
        setEditUserId(null);
        setNewUser({ name: '', email: '', role: '' });
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

            {/* User Form */}
            <div className="bg-white shadow-md rounded p-4 mb-6">
                <h2 className="text-lg font-bold mb-4">{editUserId ? 'Edit User' : 'Add New User'}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={newUser.name}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={newUser.email}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <select
                        name="role"
                        value={newUser.role}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Prescriber">Prescriber</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Triage_nurse">Triage_nurse</option>
                    </select>
                </div>
                <button
                    onClick={editUserId ? handleSaveUser : handleAddUser}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {editUserId ? 'Save Changes' : 'Add User'}
                </button>
                </div>

                {/* Users */}
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-lg font-bold mb-4">Registered Users</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2 text-left">Name</th>
                                <th className="border p-2 text-left">Email</th>
                                <th className="border p-2 text-left">Role</th>
                                <th className="border p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="border p-2">{user.name}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.role}</td>
                                    <td className="border p-2 text-center">
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;