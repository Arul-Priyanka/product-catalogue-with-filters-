import React from 'react';

export default function ProductCard({ product }) {
  const { name, price, description, emoji, tags, category } = product;
  return (
    <div className="card" title={description}>
      <div style={{display:'flex', gap:10, alignItems:'center'}}>
        <div className="emoji">{emoji}</div>
        <div>
          <div className="name">{name}</div>
          <div style={{fontSize:12, color:'#6b7280'}}>{category} • {tags?.join(', ')}</div>
        </div>
      </div>

      <div className="desc">{description}</div>

      <div className="hover-info">
        <div className="price">₹{price}</div>
        <div style={{fontSize:12, color:'#94a3b8'}}>Tap for details</div>
      </div>
    </div>
  );
}
