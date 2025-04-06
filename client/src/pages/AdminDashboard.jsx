import { useEffect, useState } from "react";
import API from "../api";
import "../style/adminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);

  const fetchStats = async () => {
    const { data } = await API.get("/admin/stats");
    setStats(data);
  };

  const fetchUsers = async () => {
    const { data } = await API.get("/admin/users");
    setUsers(data);
  };

  const toggleStatus = async (id) => {
    await API.patch(`/admin/users/${id}/toggle`);
    fetchUsers();
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Users: {stats.users}</p>
      <p>Stores: {stats.stores}</p>
      <h3>All Users</h3>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <div className="user-info">
              <span>{u.name}</span>
              <span>{u.email}</span>
              <span>Status: {u.status}</span>
            </div>
            <button onClick={() => toggleStatus(u.id)}>Toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
