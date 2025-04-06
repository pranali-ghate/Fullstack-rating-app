import { useEffect, useState } from "react";
import API from "../api";
import StoreCard from "../components/StoreCard";
import "../style/userDashboard.css";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    const { data } = await API.get("/user/stores");
    setStores(data);
  };

  const rate = async (storeId, rating) => {
    await API.post("/user/rate", { storeId, rating });
    alert("Rated!");
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
<div className="user-dashboard">
  <h2>User Dashboard</h2>
  {stores.map((s) => (
    <div className="store-block" key={s.id}>
      <StoreCard key={s.id} store={s} />
      <p>{s.name}</p>
      <input
        type="number"
        min="1"
        max="5"
        placeholder="Rate (1-5)"
        onBlur={(e) => rate(s.id, e.target.value)}
      />
    </div>
  ))}
</div>
  );
};

export default UserDashboard;
