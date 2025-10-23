import React from 'react';

export default function Filters({ filters, setFilters }) {
  const categories = ['','Clothing','Electronics','Home','Stationery','Accessories'];

  function update(k, v){
    setFilters(prev => ({...prev, [k]: v}));
  }

  function clearAll(){
    setFilters({ q:'', category:'', tag:'', minPrice:'', maxPrice:'', sort:'' });
  }

  return (
    <div>
      <label>Search</label>
      <input className="input" value={filters.q} onChange={e=>update('q', e.target.value)} placeholder="Search name, tag, desc..." />

      <label style={{marginTop:10}}>Category</label>
      <select value={filters.category} onChange={e=>update('category', e.target.value)} className="input">
        {categories.map(c => <option key={c} value={c}>{c || 'All'}</option>)}
      </select>

      <label style={{marginTop:10}}>Tag</label>
      <input className="input" value={filters.tag} onChange={e=>update('tag', e.target.value)} placeholder="e.g., audio, summer" />

      <label style={{marginTop:10}}>Price range</label>
      <div style={{display:'flex', gap:8}}>
        <input className="input" style={{flex:1}} value={filters.minPrice} onChange={e=>update('minPrice', e.target.value)} placeholder="min" />
        <input className="input" style={{flex:1}} value={filters.maxPrice} onChange={e=>update('maxPrice', e.target.value)} placeholder="max" />
      </div>

      <label style={{marginTop:10}}>Sort</label>
      <select className="input" value={filters.sort} onChange={e=>update('sort', e.target.value)}>
        <option value="">Default</option>
        <option value="price_asc">Price ↑</option>
        <option value="price_desc">Price ↓</option>
        <option value="name">Name</option>
      </select>

      <div style={{display:'flex', gap:8, marginTop:12}}>
        <button onClick={()=>update('q', filters.q)} style={{flex:1, padding:8, borderRadius:8, border:'none', background:'var(--teal)', color:'white'}}>Apply</button>
        <button onClick={clearAll} style={{flex:1, padding:8, borderRadius:8, border:'1px solid #e6eef2', background:'white'}}>Clear</button>
      </div>
    </div>
  );
}
