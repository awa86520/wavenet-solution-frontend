import React, { useEffect, useState } from 'react';
import { createUser, getUsers, deleteUser, updateUser } from '../services/auth';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async () => {
    await createUser(form);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleUpdate = async (id, role) => {
    await updateUser(id, { role });
    fetchUsers();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Users</h2>
      <div>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
        <input placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
        <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
          <option value="">Role</option>
          <option value="ADMIN">Admin</option>
          <option value="UNITMANAGER">Unit Manager</option>
          <option value="USER">User</option>
        </select>
        <button onClick={handleCreate}>Create User</button>
      </div>

      <table border="1" style={{ marginTop: 20 }}>
        <thead><tr><th>Name</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                <select value={user.role} onChange={(e) => handleUpdate(user._id, e.target.value)}>
                  <option value="ADMIN">Admin</option>
                  <option value="UNITMANAGER">Unit Manager</option>
                  <option value="USER">User</option>
                </select>
              </td>
              <td><button onClick={() => handleDelete(user._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
