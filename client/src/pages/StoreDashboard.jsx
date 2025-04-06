import { useEffect, useState } from "react";
import API from "../api";
import "../style/storeDashboard.css"

const StoreDashboard = () => {
  const [store, setStore] = useState({});
  const [form, setForm] = useState({});

  const fetchStore = async () => {
    const { data } = await API.get("/store/mystore");
    setStore(data);
    setForm({ name: data.name, description: data.description });
  };

  const update = async () => {
    await API.put("/store/mystore", form);
    fetchStore();
  };

  useEffect(() => {
    fetchStore();
  }, []);

  return (
<div className="store-dashboard">
  <h2>Store Dashboard</h2>
  <input
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    placeholder="Store Name"
  />
  <input
    value={form.description}
    onChange={(e) => setForm({ ...form, description: e.target.value })}
    placeholder="Description"
  />
  <button onClick={update}>Update</button>
</div>
  );
};

export default StoreDashboard;
