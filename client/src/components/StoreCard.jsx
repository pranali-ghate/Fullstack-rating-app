import React from 'react';

const StoreCard = ({ store }) => {
  return (
    <div className="store-card">
      <h3>{store.name}</h3>
      <p>Owner: {store.owner}</p>
      <p>Rating: {store.rating ? `${store.rating}/5` : 'Not rated yet'}</p>
    </div>
  );
};

export default StoreCard;
