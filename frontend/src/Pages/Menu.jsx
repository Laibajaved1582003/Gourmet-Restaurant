// Menu.jsx
import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import '../index.css';
import axios from 'axios';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        let url = 'http://127.0.0.1:8000/api/items/';
        if (selectedCategory !== 'all') {
          url = `http://127.0.0.1:8000/api/items/filter/?category=${selectedCategory}`;
        }
        const response = await axios.get(url);
        setMenu(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenu();
  }, [selectedCategory]);

  const formatCategory = (cat) => cat.charAt(0).toUpperCase() + cat.slice(1);
  const categories = ['all', 'starters', 'mains', 'desserts', 'drinks'];

  return (
    <section id="menu" className="menu-section">
      <h2>Our Menu</h2>
      <div className="menu-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {formatCategory(cat)}
          </button>
        ))}
      </div>

      <div className="menu-items" id="menu-items-container">
        {menu.length > 0 ? (
          menu.map((item, idx) => (
            <MenuItem
              key={idx}
              title={item.title}
              price={item.price}
              desc={item.desc}
              image={item.image_url}
              
            />
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
