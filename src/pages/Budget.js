// src/pages/BudgetPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetPage = () => {
  const [items, setItems] = useState([]);
  const [budget, setBudget] = useState(0);
  const [newItem, setNewItem] = useState({ name: '', price: '', icon: '🎁' });

  useEffect(() => {
    fetchBudget();
    fetchItems();
  }, []);

  const fetchBudget = async () => {
    const res = await axios.get('/api/budget');
    setBudget(res.data.total || 0);
  };

  const fetchItems = async () => {
    const res = await axios.get('/api/rewards');
    setItems(res.data);
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.price) return;
    await axios.post('/api/rewards', newItem);
    fetchItems();
    setNewItem({ name: '', price: '', icon: '🎁' });
  };

  const purchaseItem = async (item) => {
    if (budget < item.price) {
      alert('Nicht genug Budget');
      return;
    }
    await axios.post(`/api/rewards/${item.id}/purchase`);
    fetchItems();
    fetchBudget();
  };

  return (
    <div className="p-4 pb-24">
      <div className="text-center font-bold text-lg mb-4">Verfügbares Budget: {budget.toFixed(2)} €</div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          className="border px-2 py-1 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Preis"
          value={newItem.price}
          onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
          className="border px-2 py-1 rounded mr-2"
        />
        <button onClick={addItem} className="bg-green-600 text-white px-3 py-1 rounded">+</button>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Noch offen</h2>
        {items.filter(i => !i.purchased).map(i => (
          <div key={i.id} className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded">
            <span>{i.icon} {i.name} ({i.price.toFixed(2)} €)</span>
            <button onClick={() => purchaseItem(i)} className="text-green-600">Kaufen</button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Bereits gekauft</h2>
        {items.filter(i => i.purchased).map(i => (
          <div key={i.id} className="flex justify-between items-center text-gray-500 p-2 mb-2 bg-gray-50 rounded">
            <span>{i.icon} {i.name}</span>
            <span>{i.price.toFixed(2)} €</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetPage;
